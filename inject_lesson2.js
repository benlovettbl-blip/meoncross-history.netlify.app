const fs = require('fs');
const path = require('path');

const file = path.join('early_modern_world', 'data.js');
let raw = fs.readFileSync(file, 'utf8');

let jsonStr = raw.replace('export const unitData = ', '').replace(/;\s*$/, '');
let data = JSON.parse(jsonStr);

// Find and replace the placeholder lesson 2 if it exists, or just add it
const lesson2 = {
    id: 'lesson_2',
    title: "How did religious conflict trigger global exploration (1517–1588)?",
    enquiry: "How did religious conflict trigger global exploration (1517–1588)?",
    teacher_notes: {
        primer: "This lesson explores the causal link between the domestic and European religious upheaval of the Protestant Reformation and the subsequent global naval conflict between England and Spain. The objective is to help students understand how religious ideology directly fueled early imperialism and exploration.",
        objectives: [
            {
                objective: "Explain how the Protestant Reformation shattered European unity after 1517.",
                primer: "Direct students to the Macro-History section on Martin Luther and the 95 Theses. Emphasize how this split created a geopolitical divide that spilled into the New World.",
                question: "How did Martin Luther's actions in 1517 directly contribute to the later naval conflict between England and Spain?"
            },
            {
                objective: "Analyze the role of Elizabethan privateers in challenging Catholic Spain's global monopoly.",
                primer: "Use the Micro-History of San Juan de Ulúa and the section on Protestant Privateers to show how Drake's personal vendetta aligned with Elizabeth's need to challenge Spain cheaply.",
                question: "Why did Queen Elizabeth I choose to use privateers like Francis Drake rather than sending an official Royal Navy fleet to challenge Spain in the Americas?"
            },
            {
                objective: "Evaluate how the Spanish Armada (1588) marked a turning point in Britain’s imperial ambitions.",
                primer: "Focus on the visual analysis of the Armada Portrait and the historical interpretations to debate whether the victory was a divine miracle or a result of tactical superiority.",
                question: "Based on the visual evidence in the Armada Portrait, how did the defeat of the Spanish Armada change England's self-image and future ambitions?"
            }
        ]
    },
    do_now: {
        title: "Do Now: Previous Knowledge",
        type: "questions",
        items: [
            { question: "What was the overarching name for the ancient trade network connecting Asia to Europe?", answer: "The Silk Road" },
            { question: "Which major empire expanded to block overland European trade routes in 1453?", answer: "The Ottoman Empire" },
            { question: "What city was captured by Sultan Mehmed II in 1453?", answer: "Constantinople" },
            { question: "What West African kingdom was known for its detailed bronze plaques in the 15th century?", answer: "The Kingdom of Benin" },
            { question: "Why did the capture of Constantinople force European nations to look for new trade routes?", answer: "Because the Ottoman Empire now controlled the main overland routes to Asia, taxing or blocking trade." }
        ]
    },
    vocab: [
        { term: "Reformation", definition: "A 16th-century religious movement in Europe that resulted in the creation of Protestant churches and a split from the Catholic Church." },
        { term: "Privateer", definition: "An armed ship owned by private individuals holding a government commission (Letter of Marque) and authorized for use in war, especially in the capture of enemy merchant shipping." },
        { term: "Armada", definition: "A fleet of warships, particularly the Spanish fleet that sailed against England under the command of King Philip II in 1588." },
        { term: "Monopoly", definition: "The exclusive possession or control of the supply or trade in a commodity or service." },
        { term: "Indulgences", definition: "In the Catholic Church, a grant by the Pope of remission of the temporal punishment in purgatory still due for sins after absolution." }
    ],
    narrative_blocks: [
        {
            title: "Micro-History: San Juan de Ulúa (September 1568)",
            text: "On the muggy morning of 23 September 1568, off the coast of modern-day Mexico, a young English sea captain named Francis Drake listened to the thunder of Spanish naval cannons shattering his fleet.<br><br>Drake and his cousin, John Hawkins, had sailed into the Spanish port of San Juan de Ulúa to repair their battered ships. Spain claimed exclusive control over the entire Americas by papal decree—no Protestant English ships were legally allowed to trade or anchor in these waters. Despite a written truce signed by the Spanish Viceroy, Spanish warships ambushed the small English squadron.<br><br>Drake barely escaped aboard his small ship, the *Judith*, leaving behind dozens of English sailors to be captured, interrogated, or executed by the Spanish Inquisition.<br><br>Drake did not view this ambush merely as a commercial dispute. To him, it was a holy war. He vowed personal revenge against King Philip II of Spain and the Catholic Church. For the next twenty years, Drake’s personal quest for vengeance would turn the Atlantic Ocean into a global battlefield, transforming England from a weak island nation into an aggressive maritime power.",
            image: "/images/francis_drake.jpg",
            image_alt: "Portrait of Sir Francis Drake",
            image_caption: "Sir Francis Drake, whose personal vendetta against Spain helped transform England into a global maritime power.",
            tasks: [
                {
                    type: "comprehension",
                    question: "Why did the Spanish attack Francis Drake and John Hawkins at San Juan de Ulúa despite having signed a truce?",
                    model_answer: "The Spanish believed they had exclusive control over the Americas by papal decree, making any Protestant English ships trading or anchoring there illegal."
                }
            ]
        },
        {
            title: "Macro-History: The Big Picture",
            text: "<strong>The Reformation Shatters Europe (1517)</strong><br>To understand why Drake was fighting in Mexico, we have to look back to Germany in 1517. A monk named Martin Luther nailed his <strong>95 Theses</strong> to a church door, protesting corrupt practices in the Catholic Church—specifically the sale of \"indulgences\" (paying money to buy forgiveness for sins).<br><br>Luther’s protest ignited the <strong>Protestant Reformation</strong>. Europe fractured into two hostile religious camps:<br><br><ul><li><strong>Catholic Powers:</strong> Led by the wealthy Spanish Empire and the Pope in Rome.</li><li><strong>Protestant Powers:</strong> Small German states, the Netherlands, and eventually England after Henry VIII broke away from Rome in 1534.</li></ul><br><br><strong>The New World Monopoly and the Papal Bull</strong><br>In 1494, Pope Alexander VI issued the <strong>Treaty of Tordesillas</strong>, drawing an imaginary line down the Atlantic Ocean. The Pope declared that all newly discovered lands to the west belonged exclusively to Catholic Spain, while lands to the east belonged to Catholic Portugal.<br><br>By 1550, gold and silver fleets were pouring out of South America, funding King Philip II’s armies in Europe. Catholic Spain claimed a complete monopoly over global trade.<br><br><strong>Protestant Privateers: Pirates with a Royal License</strong><br>When Protestant Queen Elizabeth I took the English throne in 1558, England was financially weak and lacked a large navy. Elizabeth could not afford a direct war against Spain. Instead, she used <strong>privateers</strong>.<br><br>A privateer was an armed merchant captain given a official letter of license—a <strong>Letter of Marque</strong>—by the monarch. This document allowed them to attack and plunder enemy ships legally during wartime. To the Spanish, privateers like Francis Drake, Walter Raleigh, and John Hawkins were illegal pirates (<em>el Draque</em>, \"The Dragon\"). To Elizabeth, they were cheap, effective freedom fighters who brought massive wealth back to London.<br><br>Between 1577 and 1580, Drake sailed around the world on his ship, the <em>Golden Hind</em>. He raided Spanish ports along the Pacific coast of South America, captured the Spanish treasure galleon <em>Cacafuego</em> carrying 26 tons of silver, and claimed land in California (\"New Albion\") for Elizabeth. When he returned, Elizabeth knighted him on the deck of his ship—a direct insult to King Philip II.",
            image: "/images/martin_luther_portrait.jpg",
            image_alt: "Martin Luther holding the Bible",
            image_caption: "Martin Luther, whose 1517 protests sparked the Protestant Reformation and divided Europe.",
            tasks: [
                {
                    type: "analysis",
                    question: "How did Queen Elizabeth I use privateers as a strategic tool against Spain?",
                    model_answer: "Elizabeth used privateers because England lacked the funds and navy for a direct war. Privateers were a cheap and effective way to challenge Spain's monopoly, steal immense wealth to enrich England, and harass Spanish forces without officially declaring war."
                }
            ]
        },
        {
            title: "The Climax: The Spanish Armada (1588)",
            text: "Furious at English privateering, Elizabeth's support for Protestant rebels in the Netherlands, and the execution of the Catholic Mary, Queen of Scots, King Philip II decided to invade England.<br><br>In May 1588, Philip launched the <strong>Spanish Armada</strong>: 130 warships carrying 30,000 soldiers designed to overthrow Elizabeth and force England back to Catholicism.<br><br>The English navy, using smaller, faster ships equipped with long-range cannons, harassed the Armada up the English Channel. Off Calais, the English unleashed drifting <strong>fire ships</strong> (vessels packed with pitch and gunpowder set ablaze), forcing the panicked Spanish ships to cut their anchors and scatter. A disastrous storm—termed the \"Protestant Wind\"—blew the remaining Spanish fleet around the rocky coasts of Scotland and Ireland, destroying over half their ships.",
            tasks: [
                {
                    type: "comprehension",
                    question: "Describe the two main reasons the Spanish Armada failed to invade England.",
                    model_answer: "The Armada failed due to English tactics, such as using faster ships with long-range cannons and launching fire ships that scattered the Spanish fleet at Calais, and bad weather—the 'Protestant Wind' that destroyed fleeing Spanish ships on the rocky coasts of Scotland and Ireland."
                }
            ]
        },
        {
            title: "Primary Source Analysis",
            text: "<blockquote><strong>Source A: An Excerpt from Queen Elizabeth I's Speech at Tilbury (August 1588)</strong><br><em>\"I know I have the body of a weak and feeble woman; but I have the heart and stomach of a king, and of a king of England too, and think foul scorn that Parma or Spain, or any prince of Europe, should dare to invade the borders of my realm... We shall shortly have a famous victory over these enemies of my God, of my kingdom, and of my people.\"</em></blockquote><br><br><blockquote><strong>Source B: A Spanish Catholic Account of English Privateers (1579)</strong><br><em>\"This Francisco Drake is a thief, a heretic, and a minister of the Devil. He robs churches, desecrates holy images, and steals the treasure that belongs by divine right to His Catholic Majesty King Philip. He does not fight for trade; he fights to destroy the Holy Mother Church.\"</em><br>— <strong>Adapted from a letter by Don Francisco de Zárate</strong>, a Spanish captain captured by Drake.</blockquote>",
            tasks: [
                {
                    type: "source_analysis",
                    question: "How does the author’s perspective in Source B differ from Source A regarding Francis Drake's motives?",
                    model_answer: "Source A frames the conflict as a holy defense of England against 'enemies of my God', portraying the English as righteous defenders. Source B, written by a Spanish Catholic, views Drake as a 'thief' and a 'heretic' fighting to destroy the Catholic Church, focusing on his piracy and religious desecration rather than legitimate warfare."
                },
                {
                    type: "source_analysis",
                    question: "Why does Elizabeth refer to the Spanish Armada as 'enemies of my God' in Source A?",
                    model_answer: "Elizabeth refers to them as 'enemies of my God' because the conflict was fundamentally religious; Spain was Catholic and attempting to force Protestant England back into Catholicism. By claiming God was on her side, she united her Protestant subjects in a holy war."
                },
                {
                    type: "source_analysis",
                    question: "How useful is Source B to a historian studying Spanish attitudes toward English exploration in the 16th century?",
                    model_answer: "Source B is highly useful because it provides a direct, contemporary perspective from a Spanish captain. It reveals the intense religious animosity and legal perspective of the Spanish, who viewed English privateering not as legitimate exploration, but as heretical piracy and a direct assault on the Catholic Church."
                }
            ]
        },
        {
            title: "Visual Analysis: The Armada Portrait (1588)",
            text: "Look closely at <strong>The Armada Portrait</strong> painted shortly after the defeat of the Spanish fleet:<br><br><ul><li><strong>The Right Hand on the Globe:</strong> Elizabeth’s hand rests directly over North America, signaling England's intent to challenge Catholic Spain for global empire.</li><li><strong>The Background Windows:</strong> The left window shows the calm English fleet; the right window shows the shattered Spanish Armada crashing against rocky shores in a storm.</li><li><strong>The Mermaid:</strong> A carved mermaid on the imperial chair symbolizes the English control of the seas and the temptation/destruction of foreign fleets.</li></ul>",
            image: "/images/armada_portrait.jpg",
            image_alt: "The Armada Portrait of Queen Elizabeth I",
            image_caption: "The Armada Portrait, heavy with symbolism, showing Elizabeth resting her hand on a globe covering North America.",
            tasks: [
                {
                    type: "analysis",
                    question: "What message was the artist of the Armada Portrait trying to convey about England's future?",
                    model_answer: "The artist was conveying that England, having destroyed the mighty Spanish Armada (shown in the background), was now destined to become a dominant global and maritime empire, explicitly claiming the Americas (shown by her hand resting on the globe)."
                }
            ]
        },
        {
            title: "Historical Interpretations: Was the Armada Defeat a Religious Miracle or Tactical Failure?",
            text: "<blockquote><strong>Historian Perspective A: Traditional View (19th Century)</strong><br><em>\"The defeat of the Armada was a miraculous victory for Protestantism and freedom. God sent a divine storm to scatter the Catholic tyrant’s fleet, paving the way for the rise of the British Empire.\"</em></blockquote><br><br><blockquote><strong>Historian Perspective B: Revisionist View (Dr. Geoffrey Parker, 2013)</strong><br><em>\"Philip II’s invasion failed due to structural flaws: poor communications between Spain and the Netherlands, rigid tactics, and terrible naval logistics. The 'Protestant Wind' simply finished off a fleet that had already been outmaneuvered by superior English ship design and artillery.\"</em></blockquote>",
            tasks: [
                {
                    type: "comprehension",
                    question: "How does the revisionist view (Perspective B) challenge the traditional view (Perspective A) of the Armada's defeat?",
                    model_answer: "Perspective A argues the defeat was a divine, miraculous event driven by the 'Protestant Wind' sent by God. Perspective B challenges this by arguing it was actually caused by human errors and Spanish structural flaws—such as poor logistics, rigid tactics, and superior English ship design—with the weather only playing a secondary role at the end."
                }
            ]
        }
    ],
    quiz: [
        {
            q: "In what year did Martin Luther post his 95 Theses, starting the Protestant Reformation?",
            a: "1517",
            distractors: ["1492", "1534", "1588"]
        },
        {
            q: "Which English monarch broke away from the Catholic Church in 1534 to establish the Church of England?",
            a: "Henry VIII",
            distractors: ["Elizabeth I", "Mary I", "Edward VI"]
        },
        {
            q: "What was the name of the 1494 papal agreement that divided the Americas between Spain and Portugal?",
            a: "The Treaty of Tordesillas",
            distractors: ["The Treaty of Versailles", "The Magna Carta", "The Edict of Nantes"]
        },
        {
            q: "What official document gave privateers legal permission from a monarch to attack foreign ships?",
            a: "A Letter of Marque",
            distractors: ["A Papal Bull", "A Royal Charter", "An Indulgence"]
        },
        {
            q: "What nickname did the Spanish give to Sir Francis Drake?",
            a: "El Draque (\"The Dragon\")",
            distractors: ["The Pirate King", "The Heretic", "The English Devil"]
        },
        {
            q: "Name the flagship on which Sir Francis Drake circumnavigated the globe between 1577 and 1580.",
            a: "The Golden Hind",
            distractors: ["The Mayflower", "The Mary Rose", "The Victory"]
        },
        {
            q: "Which English naval tactic shattered the Spanish fleet formation while anchored off Calais in 1588?",
            a: "Fire ships",
            distractors: ["Boarding parties", "Submarine warfare", "Cannon bombardment from shore"]
        },
        {
            q: "Who was the Catholic King of Spain who launched the Armada against England in 1588?",
            a: "King Philip II",
            distractors: ["King Charles V", "King Ferdinand II", "King Louis XIV"]
        },
        {
            q: "What term was used to describe the storms that wrecked the fleeing Spanish ships off Scotland and Ireland?",
            a: "The Protestant Wind",
            distractors: ["The Armada Storm", "The English Channel Gale", "The Divine Tempest"]
        },
        {
            q: "What continent does Queen Elizabeth's hand rest upon in the famous 1588 Armada Portrait?",
            a: "North America",
            distractors: ["Europe", "Africa", "Asia"]
        }
    ]
};

// Check if lesson 2 already exists
const idx = data.lessons.findIndex(l => l.id === 'lesson_2');
if (idx !== -1) {
    data.lessons[idx] = lesson2;
} else {
    data.lessons.splice(1, 0, lesson2); // Insert as the 2nd item
}

// Write back to file
const out = `export const unitData = ${JSON.stringify(data, null, 4)};\n`;
fs.writeFileSync(file, out);
console.log("Successfully injected Lesson 2 into early_modern_world/data.js");
