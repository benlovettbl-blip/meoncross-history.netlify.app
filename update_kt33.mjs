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
    id: "lesson_3_3",
    title: "KT3.3: Exploration and voyages of discovery",
    enquiry: "Why did the Elizabethan era become an 'Age of Discovery', and why did Walter Raleigh’s ambitious dream of a New World colony end in disaster?",
    teacher_notes: {
        primer: "This lesson covers the technological and economic drivers of Elizabethan exploration, focusing on Drake's circumnavigation and Raleigh's disastrous attempts to colonise Virginia. It emphasises the catastrophic intersection of poor planning, Native American resistance, and the Spanish Armada in dooming the Roanoke colony.",
        objectives: [
            {
                objective: "Understand the factors that prompted Elizabethan exploration, focusing on new technology, expanding trade, and privateering.",
                primer: "Discuss the collapse of the Antwerp cloth market as a catalyst for seeking new markets, and the role of new technologies like the astrolabe and galleon.",
                question: "What navigational instrument allowed sailors to determine their latitude using the stars?"
            },
            {
                objective: "Explain the reasons for, and the immense geopolitical significance of, Francis Drake's circumnavigation of the globe.",
                primer: "Highlight the financial success (£400,000) and how Drake's knighting on the Golden Hind acted as a catalyst for war with Spain.",
                question: "What was the name of the ship on which Elizabeth knighted Francis Drake?"
            },
            {
                objective: "Analyse the reasons behind Walter Raleigh's attempts to colonise Virginia.",
                primer: "Explain that Virginia was intended to rival Spain, provide a privateering base, and secure raw materials.",
                question: "Who was given a royal charter in 1584 to colonise North America?"
            },
            {
                objective: "Evaluate the intersecting reasons for the catastrophic failure of the Virginia colonies, weighing poor planning against Native American resistance and the Spanish war.",
                primer: "Discuss the ruin of the Tiger's supplies, the aggressive leadership of Ralph Lane, Chief Wingina's retaliation, and how the Armada prevented resupply.",
                question: "Which Native American Chief turned against the English and attacked the colony?"
            }
        ]
    },
    learning_objectives: {
        target: [
            "Understand the factors that prompted Elizabethan exploration, focusing on new technology, expanding trade, and privateering.",
            "Explain the reasons for, and the immense geopolitical significance of, Francis Drake's circumnavigation of the globe.",
            "Analyse the reasons behind Walter Raleigh's attempts to colonise Virginia.",
            "Evaluate the intersecting reasons for the catastrophic failure of the Virginia colonies, weighing poor planning against Native American resistance and the Spanish war."
        ],
        scaffolded: [
            "List the reasons why Elizabethan sailors started exploring the world.",
            "Describe Francis Drake's circumnavigation and why it angered Spain.",
            "Explain why Walter Raleigh wanted to start a colony in America.",
            "Describe the reasons why the Virginia colony completely failed."
        ]
    },
    vocab: [
        { term: "Circumnavigation", definition: "To sail completely around the world. Between 1577 and 1580, Francis Drake became the first Englishman to achieve this." },
        { term: "Astrolabe", definition: "A navigational instrument used by sailors to determine their latitude by the position of the stars, vastly improving the safety and accuracy of oceanic travel." },
        { term: "Privateer", definition: "A privately owned ship (or its captain) officially authorised by Elizabeth to attack and capture enemy (Spanish) vessels." },
        { term: "Roanoke", definition: "An island off the coast of North America (modern-day North Carolina) where Walter Raleigh’s ill-fated colonies were established." }
    ],
    narrative: [
        {
            heading: "The Catalyst for Exploration",
            content: "Before Elizabeth's reign, England was a relatively minor power focused entirely on Europe. However, by the 1570s, a surge of exploration transformed England's global reach. This was driven by a combination of factors:\n\n1. **Expanding Trade:** Historically, England relied entirely on exporting wool to Antwerp. When relations with Spain deteriorated and the Antwerp market collapsed, English merchants desperately needed to find new, global markets. This acted as a direct *catalyst for* the creation of overseas trading companies, such as the Muscovy Company (trading with Russia) and the Eastland Company.\n2. **New Technology:** Exploration was made possible by major advancements in navigation. The **astrolabe** and the quadrant allowed sailors to calculate their exact position at sea. Furthermore, mapmaking vastly improved, with the Mercator projection allowing for highly accurate sea charts.\n3. **Ship Design:** English shipbuilders developed the **galleon**. These ships were faster, lower in the water, and featured highly manoeuvrable triangular (lateen) sails, allowing them to sail effectively across treacherous oceans.\n4. **Privateering:** The desire for vast, rapid wealth drove sailors to the New World. English privateers aimed to raid the highly lucrative Spanish treasure fleets returning from Central and South America."
        },
        {
            heading: "Drake's Circumnavigation (1577–80)",
            content: "In 1577, Sir Francis Drake set sail on a secret mission funded by Elizabeth. His primary goal was to raid Spanish colonies on the Pacific coast of South America, an area the Spanish thought was entirely safe. Forced to keep sailing west to avoid Spanish capture, Drake inadvertently completed a three-year **circumnavigation** of the globe.\n\nHis journey was highly significant. First, he claimed land in North America (modern-day California), naming it *Nova Albion* for the Queen. Second, he captured a staggering £400,000 of Spanish silver (mostly from the treasure ship *Cacafuego*). When Drake returned, Elizabeth publicly knighted him on the deck of his ship, the *Golden Hind*. This massive insult was *intrinsically linked* to the outbreak of the Anglo-Spanish war, as it proved Elizabeth openly supported piracy."
        },
        {
            heading: "Walter Raleigh and the Failure of Virginia",
            content: "Elizabeth wanted to establish a permanent English colony in North America to rival Spain's empire, provide a base for privateering, and secure raw materials. In 1584, she gave Sir Walter Raleigh a royal charter to colonise an area he named **Virginia** (in honour of the 'Virgin Queen'). Raleigh did not go himself, but he organised and funded two major expeditions (1585 and 1587) to Roanoke Island.\n\nBoth attempts ended in absolute disaster due to a combination of factors:\n\n* **Poor Planning and Lack of Food:** During the 1585 expedition, the English flagship, *The Tiger*, hit a sandbank and let in seawater. This completely ruined their crucial food supplies and the seeds they had brought to plant crops. This immediately forced the English to rely on Native Americans for food, which bred resentment.\n* **Poor Leadership:** The colony's leaders—specifically Richard Grenville and Ralph Lane—argued constantly. Lane was deeply aggressive and militaristic, prioritizing the hunt for gold over establishing a sustainable farming settlement.\n* **Native American Resistance:** Driven by English aggression, demands for food, and the devastating spread of European diseases, the local Algonquian tribes fought back. **Chief Wingina** turned entirely against the English, launching attacks that made the colony untenable.\n* **The Spanish Armada:** The second colonisation attempt in 1587 (which included women and children) was doomed by geopolitical events. Because of the Spanish Armada in 1588, Elizabeth banned all ships from leaving England. This meant that the colony's leader, John White, could not return with vital rescue supplies for three years. When he finally returned in 1590, the entire colony had vanished without a trace, remembered today as the 'Lost Colony'."
        },
        {
            heading: "The Big Picture",
            content: "The Elizabethan era was the turbulent dawn of the British Empire. Forced outward by the collapse of European trade, English sailors utilised cutting-edge technology and galleon designs to project English power across the globe. While Drake’s circumnavigation was a dazzling financial and propaganda triumph that enraged Spain, Raleigh’s Virginia campaigns offered a brutal reality check. The failures at Roanoke proved that creating an empire required more than just the piracy of privateers; it required careful logistical planning, farming expertise, and sustainable diplomacy. These harsh lessons, however, laid the essential foundations for the successful Jamestown colony established shortly after Elizabeth's death in 1607."
        }
    ],
    exam_practice: [
        {
            type: "12_marks",
            question: "Explain why the English attempt to colonise Virginia in 1585–87 failed.",
            examiner_tip: "To achieve Level 4, ensure you explain the *interaction* between the different causes of failure.\n\n**Paragraph 1 (Supplies & Planning):** Explain how the physical damage to the ship *The Tiger* ruined their food/seeds. Use analytical language: this *acted as a catalyst for* conflict, as it forced the settlers to demand food from the locals.\n\n**Paragraph 2 (Native American Resistance & Leadership):** Explain how the aggressive leadership of Ralph Lane and the spread of English disease *exacerbated* the situation. This led directly to Chief Wingina attacking the settlement, making it untenable.\n\n**Paragraph 3 (The Spanish Armada):** Explain how the failure was *intrinsically linked* to events back home. Because every ship was needed to fight the 1588 Armada, the 1587 settlers were entirely abandoned and left without a resupply ship for three years."
        }
    ],
    recall_questions: [
        { q: "What traditional English trade market collapsed, prompting the search for new global markets?", a: "The Antwerp cloth market" },
        { q: "Name an essential navigational instrument that used the stars to determine latitude.", a: "The Astrolabe / Quadrant" },
        { q: "What type of new, highly manoeuvrable warship was developed by the English?", a: "The Galleon" },
        { q: "What term describes a sailor officially licensed by the Queen to attack Spanish ships?", a: "Privateer" },
        { q: "Between which years did Francis Drake circumnavigate the globe?", a: "1577–1580" },
        { q: "What area of North America (modern-day California) did Drake claim for Elizabeth?", a: "Nova Albion" },
        { q: "Roughly how much Spanish treasure did Drake bring back to England?", a: "£400,000" },
        { q: "On which ship was Francis Drake knighted by Queen Elizabeth?", a: "The Golden Hind" },
        { q: "Which English nobleman was given a royal charter in 1584 to colonise North America?", a: "Sir Walter Raleigh" },
        { q: "What name was given to the new territory in honour of Elizabeth?", a: "Virginia" },
        { q: "On which specific island off the coast of North America did the colonists land?", a: "Roanoke Island" },
        { q: "What was the name of the flagship that hit a sandbank, ruining the colony's food and seeds?", a: "The Tiger" },
        { q: "Name one of the aggressive military leaders of the 1585 expedition who caused conflict.", a: "Ralph Lane (or Richard Grenville)" },
        { q: "Which Native American Chief turned against the English and attacked the colony?", a: "Chief Wingina" },
        { q: "Why did Native Americans turn against the English settlers?", a: "English demands for food, aggressive behaviour, and the spread of deadly European diseases" },
        { q: "In what year was the second attempt to establish a colony (which included women and children) launched?", a: "1587" },
        { q: "Who was the leader of the 1587 expedition who returned to England for supplies?", a: "John White" },
        { q: "Why couldn't supply ships return to Virginia in 1588?", a: "All English ships were requisitioned to fight the Spanish Armada" },
        { q: "How long were the 1587 colonists left without any supplies or communication?", a: "Three years" },
        { q: "What is the famous nickname given to the 1587 settlement that vanished without a trace?", a: "The 'Lost Colony'" }
    ],
    do_now: {
        type: "questions",
        tasks: [
            { q: "What compulsory local tax was introduced by the 1572 Vagabonds Act?", a: "The Poor Rate" },
            { q: "What was an 'Able-Bodied Poor' person?", a: "An unemployed person physically capable of working, often viewed with intense suspicion by Tudors as lazy or dangerous." },
            { q: "How did the agricultural practice of enclosure contribute to the poverty crisis?", a: "Landlords fenced off land for sheep farming, which required far fewer workers than crop farming, leading to mass evictions and rural unemployment." },
            { q: "15 Second Challenge", a: "Try to speak for 15 seconds non-stop about the Puritan opposition to the Elizabethan theatre." }
        ]
    }
};

const existingIndex = unitData.lessons.findIndex(l => l.id === "lesson_3_3");
if (existingIndex !== -1) {
    unitData.lessons[existingIndex] = newLesson;
} else {
    unitData.lessons.push(newLesson);
}

unitData.lessons.sort((a, b) => a.id.localeCompare(b.id));

const newIndividuals = [
    {
        "id": "walter_raleigh",
        "name": "Sir Walter Raleigh",
        "role": "Explorer and Courtier",
        "bio": "An ambitious Elizabethan courtier who was granted a royal charter in 1584 to establish a North American colony to rival Spain. He funded and organised the disastrous Roanoke expeditions.",
        "image": "/assets/placeholder_cover.jpg"
    },
    {
        "id": "chief_wingina",
        "name": "Chief Wingina",
        "role": "Algonquian Leader",
        "bio": "A local Native American chief near Roanoke Island who initially traded with the English. However, driven by English aggression and disease, he turned against them and launched an attack on the colony.",
        "image": "/assets/placeholder_cover.jpg"
    },
    {
        "id": "ralph_lane",
        "name": "Ralph Lane",
        "role": "Colony Governor (1585)",
        "bio": "An aggressive, militaristic leader of the 1585 Roanoke expedition. His hostility toward the local Algonquian tribes and demands for food destroyed early diplomacy and bred resentment.",
        "image": "/assets/placeholder_cover.jpg"
    },
    {
        "id": "john_white",
        "name": "John White",
        "role": "Colony Governor (1587) and Artist",
        "bio": "The leader of the 1587 Roanoke expedition who returned to England for supplies. Trapped by the Armada crisis, he could not return for three years and eventually found the colony had vanished.",
        "image": "/assets/placeholder_cover.jpg"
    }
];

newIndividuals.forEach(ind => {
    if (!unitData.key_individuals.find(k => k.id === ind.id)) {
        unitData.key_individuals.push(ind);
    }
});

fs.writeFileSync(dataFilePath, 'export const unitData = ' + JSON.stringify(unitData, null, 4) + ';\n', 'utf8');
console.log("Successfully injected lesson_3_3 to eee/data.js and added Key Individuals.");
