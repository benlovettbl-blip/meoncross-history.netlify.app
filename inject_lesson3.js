const fs = require('fs');
const path = require('path');

const file = path.join('early_modern_world', 'data.js');
let raw = fs.readFileSync(file, 'utf8');

let jsonStr = raw.replace('export const unitData = ', '').replace(/;\s*$/, '');
let data = JSON.parse(jsonStr);

const lesson3 = {
    id: 'lesson_3',
    title: "Trade or takeover: How did early encounters turn into empire?",
    enquiry: "How did early encounters turn into empire? (East India Company, Jamestown/Roanoke)",
    teacher_notes: {
        primer: "This lesson compares two contrasting forms of early English colonial expansion: desperate territorial settlement in North America (Roanoke/Jamestown) and polite mercantile trade with the powerful Mughal Empire in India. It aims to show students that the British Empire was not a monolithic, pre-planned military conquest, but a varied process driven by joint-stock capitalism that opportunistically shifted from trade to takeover.",
        objectives: [
            {
                objective: "Explain how joint-stock corporations (like the East India Company and Virginia Company) funded early English expansion.",
                primer: "Highlight the Macro-History section on Joint-Stock Capital. Ensure students grasp that the Crown was poor, so private capitalism and shared risk drove the expansion.",
                question: "Why did the English rely on joint-stock companies rather than royal armies to explore and trade overseas?"
            },
            {
                objective: "Compare the early English colonial encounters in North America (Roanoke and Jamestown) with mercantile trade in Mughal India.",
                primer: "Use the Jamestown and Mughal India sections to draw a stark contrast. The English were aggressive and desperate in America, but submissive and polite in wealthy India.",
                question: "How did Sir Thomas Roe's behavior at the Mughal Court differ from the behavior of the English settlers in Virginia, and why?"
            },
            {
                objective: "Evaluate the turning point where peaceful commercial trade shifted into territorial takeover and subjugation.",
                primer: "Discuss the Historical Interpretations section, particularly Tharoor's argument that joint-stock companies were always designed to extract wealth and subjugate when the opportunity arose.",
                question: "At what point did the East India Company transform from humble traders into a conquering force, and what allowed this to happen?"
            }
        ]
    },
    do_now: {
        title: "Do Now: Previous Knowledge",
        type: "questions",
        items: [
            { question: "In what year did Martin Luther post his 95 Theses?", answer: "1517" },
            { question: "What name was given to English sailors, like Francis Drake, who were given legal permission to attack Spanish ships?", answer: "Privateers" },
            { question: "What was the name of the Spanish King who launched the Armada against England in 1588?", answer: "King Philip II" },
            { question: "What weather event destroyed much of the fleeing Spanish Armada off the coast of Scotland?", answer: "The Protestant Wind" },
            { question: "Why did Queen Elizabeth I use privateers instead of the Royal Navy to challenge Spain in the Americas?", answer: "England was financially weak and lacked a large navy, so privateers were a cheap way to challenge Spain without a direct war." }
        ]
    },
    vocab: [
        { term: "Joint-Stock Company", definition: "A company whose stock is owned jointly by the shareholders, spreading the financial risk of overseas ventures." },
        { term: "Charter", definition: "A written grant by a country's sovereign or legislative power, by which a company is created and its rights and privileges defined." },
        { term: "Mercantile", definition: "Relating to trade or commerce; commercial." },
        { term: "Subjugation", definition: "The action of bringing someone or something under domination or control." },
        { term: "Factory", definition: "In the 17th century, a fortified trading post or warehouse established by a merchant company in a foreign country." }
    ],
    narrative_blocks: [
        {
            title: "Micro-History: Matoaka in London (1616)",
            text: "In the winter of 1616, a 21-year-old Algonquin woman named Matoaka—popularly known as Pocahontas—arrived at the court of King James I in London.<br><br>She was dressed not in the traditional deer skins of her Powhatan homeland in North America, but in heavy English velvet, lace ruffles, and a tall felt hat. Rechristened \"Rebecca Rolfe\" following her conversion to Christianity and marriage to English tobacco planter John Rolfe, she was brought to England by the <strong>Virginia Company</strong> as a living advertisement.<br><br>To the rich investors of London, Matoaka was proof that native populations in the \"New World\" could be tamed, converted, and integrated into a profitable English empire. But the reality back in North America was far grim. Matoaka had been kidnapped three years earlier by English colonists during a bloody border war. Within months of her court appearance in London, as she boarded a ship to return home, she fell ill and died at Gravesend on the River Thames.<br><br>Matoaka’s tragic life encapsulated the reality of early British expansion: what began as desperate, fragile trade encounters between unequal powers rapidly hardened into violent land seizures and permanent imperial domination.",
            image: "/images/pocahontas.jpg",
            image_alt: "Engraving of Pocahontas in English attire",
            image_caption: "An engraving of Matoaka (Pocahontas) dressed in English court fashion in 1616, used as propaganda by the Virginia Company.",
            tasks: [
                {
                    type: "comprehension",
                    question: "Why was Matoaka brought to the court of King James I in London?",
                    model_answer: "She was brought by the Virginia Company as a living advertisement to prove to rich investors that native populations could be converted to Christianity, civilized, and integrated into a profitable English empire."
                }
            ]
        },
        {
            title: "Macro-History: The Big Picture",
            text: "Unlike Catholic Spain, where the King directly funded conquistadors and royal armies, early English expansion was driven by <strong>private enterprise and capitalism</strong>.<br><br>The English Crown was too poor to fund risky overseas voyages. Instead, wealthy merchants formed <strong>Joint-Stock Companies</strong>. Multiple investors pooled their capital to buy shares in a trading venture. If a ship sank or a colony failed, no single merchant was ruined; if it succeeded, the profits were divided proportional to their shares.<br><br><strong>The American Frontier: From Lost Colony to Cash Crop</strong><br>In the 1580s, Sir Walter Raleigh organized the first English attempt to colonize North America on <strong>Roanoke Island</strong> (modern-day North Carolina). It ended in total failure. When supply ships returned in 1590, the entire colony of 115 men, women, and children had vanished, leaving behind only the single word carved into a wooden post: <em>\"CROATOAN\"</em>.<br><br>Undeterred, the <strong>Virginia Company</strong> launched a new venture in 1607, founding <strong>Jamestown</strong>. The early years were disastrous:<br><ul><li><strong>The Starving Time (1609–1610):</strong> Over 80% of the settlers died of dysentery, malaria, and starvation.</li><li><strong>The Powhatan Confederacy:</strong> The local indigenous population, led by Chief Powhatan, initially kept the inept English alive by trading maize.</li><li><strong>Tobacco Saved the Colony:</strong> In 1612, John Rolfe introduced a sweet Caribbean tobacco strain. Tobacco became Virginia’s \"green gold.\"</li></ul><br>To grow tobacco at scale, the colonists needed vast land and cheap labor. The English abandoned peaceful trade with the Powhatan and launched aggressive land seizures, sparking decades of brutal warfare.<br><br><strong>Mughal India: Bowing Before the Peacock Throne</strong><br>While the English were seizing land in America, their presence in Asia looked completely different.<br><br>In 1600, Queen Elizabeth I granted a royal charter to the <strong>Governor and Company of Merchants of London Trading into the East Indies</strong>—better known as the <strong>East India Company (EIC)</strong>. When EIC merchant ships arrived in India, they encountered the vast <strong>Mughal Empire</strong>, ruled by Emperor Jahangir.<br><br>The Mughal Empire held 25% of world GDP, possessed massive armies, and produced the world's finest cotton textiles. The English could not conquer India by force.<br><br>In 1615, King James I sent diplomat <strong>Sir Thomas Roe</strong> to Jahangir’s court. Roe spent three years bowing before the Emperor, offering bribes and gifts, and begging for a <em>firman</em> (imperial decree) allowing the EIC to build fortified trading posts (<em>factories</em>) along the coast. For 150 years, the EIC remained humble traders paying taxes to the Mughals. But as Mughal central power began to fracture in the early 1700s, the EIC transformed its private corporate security guards into a ruthless private army—laying the groundwork for the total military conquest of India.",
            image: "/images/sir_thomas_roe.jpg",
            image_alt: "Sir Thomas Roe at Mughal Court",
            image_caption: "Sir Thomas Roe presenting his credentials to the wealthy and powerful Mughal Emperor Jahangir in 1615.",
            tasks: [
                {
                    type: "analysis",
                    question: "How did the funding of early English colonial expansion differ from the Spanish model?",
                    model_answer: "Unlike Spain, which used royal armies funded directly by the King, English expansion was driven by private capitalism. Wealthy merchants formed joint-stock companies to pool their money and share the financial risk of overseas voyages, as the English Crown was too poor to fund them."
                }
            ]
        },
        {
            title: "Primary Source Analysis",
            text: "<blockquote><strong>Source A: From the First Charter of the Virginia Company (1606)</strong><br><em>\"We greatly commend their desires for the furtherance of so noble a work, which may, by the Providence of Almighty God, hereafter tend to the Glory of His Divine Majesty, in propagating of Christian Religion to such People as yet live in Ignorance and miserable Barbarism, and may in time bring the infidels and savages living in those parts to human civility...\"</em></blockquote><br><br><blockquote><strong>Source B: From the Journal of Sir Thomas Roe at the Mughal Court (1616)</strong><br><em>\"The Emperor Jahangir hath rich carpets, thrones of solid gold, and jewels beyond counting. He treats our King’s letters with polite indifference, viewing us as small traders from a cold, poor island... He cares nothing for our goods, save for clockwork toys and English hunting dogs, but he permits us to trade so long as we pay our taxes and remain obedient subjects.\"</em></blockquote>",
            tasks: [
                {
                    type: "source_analysis",
                    question: "What was the primary motivation stated in Source A for colonizing Virginia, and why might the Virginia Company emphasize religious duty over profit?",
                    model_answer: "Source A states that the primary motivation was to spread the Christian religion to \"savages\" and bring them to \"human civility\". The Virginia Company likely emphasized this religious duty to gain moral and royal approval, masking their underlying desire for profit and making the colonial venture seem like a noble, God-ordained mission."
                },
                {
                    type: "source_analysis",
                    question: "Using Source B, explain why the East India Company was forced to act politely toward Mughal rulers in 1616, whereas English settlers in Virginia acted aggressively toward Native Americans.",
                    model_answer: "Source B shows that the Mughal Empire was incredibly wealthy (\"thrones of solid gold\") and viewed the English as insignificant \"small traders\". The English were vastly outnumbered and outgunned by the powerful Mughals, forcing them to be \"obedient subjects\" and pay taxes. In Virginia, despite initial weakness, the English eventually had the military capacity to seize land aggressively from the Powhatan."
                },
                {
                    type: "source_analysis",
                    question: "Which source is more useful to a historian studying the economic motivations behind early British overseas expansion?",
                    model_answer: "Source B is more useful for studying economic motivations because it directly addresses trade, taxes, and goods. Roe's journal reveals the practical realities and desperation of English merchants trying to secure a foothold in lucrative Asian markets. Source A is less useful for economics, as it primarily serves as religious propaganda to justify the Virginia Company's colonial charter."
                }
            ]
        },
        {
            title: "Visual Analysis: The Jamestown Triangular Fort Plan (1607)",
            text: "Examine the 1607 architectural plan of James Fort in Virginia:<br><br><ul><li><strong>The Triangular Shape:</strong> Designed for maximum defense with minimal men. A cannon bastioned at each of the three corners provided 360-degree crossfire.</li><li><strong>River Orientation:</strong> The fort sat directly on the James River, allowing quick escape or resupply by sea, but surrounded by stagnant marshland filled with malarial mosquitoes.</li><li><strong>Palisade Walls:</strong> High wooden walls built from felled timber shielded the storehouses and chapel, turning the settlement into an armed military outpost rather than a peaceful civilian farm.</li></ul>",
            image: "/images/jamestown_fort.jpg",
            image_alt: "Map plan of the triangular James Fort in Virginia, 1607",
            image_caption: "The 1607 triangular plan of James Fort, demonstrating the heavily militarized and defensive nature of early English settlements in America.",
            tasks: [
                {
                    type: "analysis",
                    question: "What does the design of the Jamestown Fort suggest about the relationship between the English settlers and the local indigenous population?",
                    model_answer: "The triangular design, high palisade walls, and corner cannons suggest that the English settlers felt highly vulnerable and expected hostile attacks. It shows that the relationship was characterized by fear, mistrust, and military conflict rather than peaceful cooperation and trade."
                }
            ]
        },
        {
            title: "Historical Interpretations: Was the British Empire Planned or Accidental?",
            text: "<blockquote><strong>Historian Perspective A: Sir John Seeley (The Expansion of England, 1883)</strong><br><em>\"We seem, as it were, to have conquered and peopled half the world in a fit of absence of mind... The British Empire was not planned by kings or generals; it grew organically through small merchants, traders, and adventurers seeking honest commercial trade.\"</em></blockquote><br><br><blockquote><strong>Historian Perspective B: Professor Shashi Tharoor (Inglorious Empire, 2017)</strong><br><em>\"There was nothing 'accidental' about the corporate greed of the East India Company or the Virginia Company. From their inception, joint-stock corporations were designed with royal backing to extract wealth, monopolize global trade, and subjugate local populations whenever commercial trade turned into territorial opportunity.\"</em></blockquote>",
            tasks: [
                {
                    type: "comprehension",
                    question: "How do Perspective A and Perspective B disagree on the origins of the British Empire?",
                    model_answer: "Perspective A argues the Empire was an \"accidental\" and organic growth created by small merchants just seeking honest trade, without any grand military plan. Perspective B strongly disagrees, arguing the Empire was a deliberate, greedy corporate strategy from the start, designed to extract wealth and subjugate local populations whenever possible."
                }
            ]
        }
    ],
    quiz: [
        {
            q: "What type of business model allowed multiple investors to pool their money to fund risky overseas colonial ventures?",
            a: "Joint-Stock Companies",
            distractors: ["Royal Monopolies", "Feudal Guilds", "State-Owned Enterprises"]
        },
        {
            q: "On which island was the famous \"Lost Colony\" of 1585 founded by Sir Walter Raleigh?",
            a: "Roanoke Island",
            distractors: ["Jamestown Island", "Manhattan Island", "Bermuda"]
        },
        {
            q: "What single word was found carved into a wooden post when supply ships returned to Roanoke in 1590?",
            a: "CROATOAN",
            distractors: ["DANGER", "FAMINE", "ABANDONED"]
        },
        {
            q: "What was the name of the first permanent English settlement established in North America in 1607?",
            a: "Jamestown",
            distractors: ["Plymouth", "Boston", "Williamsburg"]
        },
        {
            q: "Which cash crop introduced by John Rolfe saved the Jamestown colony from economic ruin?",
            a: "Tobacco",
            distractors: ["Cotton", "Sugar", "Indigo"]
        },
        {
            q: "What was the title of the native ruler who led the Powhatan Confederacy when the English arrived in Virginia?",
            a: "Chief Powhatan (Wahunsenacawh)",
            distractors: ["Chief Sitting Bull", "Chief Pontiac", "Chief Tecumseh"]
        },
        {
            q: "In what year was the English East India Company (EIC) granted its royal charter by Queen Elizabeth I?",
            a: "1600",
            distractors: ["1492", "1588", "1620"]
        },
        {
            q: "Which powerful Muslim empire ruled India during the 17th century when the English first arrived?",
            a: "The Mughal Empire",
            distractors: ["The Ottoman Empire", "The Safavid Empire", "The Maratha Empire"]
        },
        {
            q: "Name the English ambassador sent by King James I to bow before Emperor Jahangir in 1615.",
            a: "Sir Thomas Roe",
            distractors: ["Sir Walter Raleigh", "Sir Francis Drake", "Sir John Hawkins"]
        },
        {
            q: "What term was used to describe the fortified warehouse trading posts established by the EIC along the Indian coast?",
            a: "Factories",
            distractors: ["Fortresses", "Emporiums", "Citadels"]
        }
    ]
};

const idx = data.lessons.findIndex(l => l.id === 'lesson_3');
if (idx !== -1) {
    data.lessons[idx] = lesson3;
} else {
    data.lessons.splice(2, 0, lesson3);
}

const out = `export const unitData = ${JSON.stringify(data, null, 4)};\n`;
fs.writeFileSync(file, out);
console.log("Successfully injected Lesson 3 into early_modern_world/data.js");
