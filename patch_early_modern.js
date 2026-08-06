const fs = require('fs');

let dataStr = fs.readFileSync('early_modern_world/data.js', 'utf8');
const jsonStr = dataStr.replace('export const unitData = ', '').trim().replace(/;$/, '');
const unit = eval('(' + jsonStr + ')');

// 1. Pedagogical Fixes
// Lesson 1: Hinge Question
unit.lessons[0].narrative_blocks.push({
    title: "Plenary Check",
    text: "Before we move on, let's check our understanding of the changing balance of global power in 1450.",
    hinge_question: {
        question: "Which of the following best describes the position of Western Europe in 1450?",
        options: [
            "A wealthy, dominant global superpower.",
            "An isolated region, desperate for new trade routes to Asia.",
            "The center of the Silk Road network."
        ],
        answer: 1,
        explanation: "Europe was cut off from the wealth of Asia by the Ottoman Empire."
    }
});

// Lesson 2: Hinge Question
unit.lessons[1].narrative_blocks.push({
    title: "Plenary Check",
    text: "Let's review the connection between religion, exploration, and rivalry.",
    hinge_question: {
        question: "Why did the Pope create the Treaty of Tordesillas (1494)?",
        options: [
            "To encourage Protestant countries to explore.",
            "To divide the newly 'discovered' lands between Catholic Spain and Portugal to prevent war.",
            "To ban all European exploration of the Americas."
        ],
        answer: 1,
        explanation: "The Pope wanted to prevent a war between two powerful Catholic nations."
    }
});

// Lesson 3: Vocab Task + Hinge Question
unit.lessons[2].narrative_blocks.splice(3, 0, {
    title: "Vocabulary Check: Building Empires",
    text: "Understanding how the British Empire was built requires some specific historical vocabulary.",
    tasks: [
        {
            type: "vocab_match",
            words: ["Monopoly", "Charter", "Joint-Stock Company"],
            definitions: [
                "Exclusive control over trade in a specific area.",
                "A royal document granting rights and privileges to a company.",
                "A business where investors buy shares and share the risks and profits."
            ]
        }
    ]
});
unit.lessons[2].narrative_blocks.push({
    title: "Plenary Check",
    text: "Let's test your understanding of how early trade turned into empire.",
    hinge_question: {
        question: "How was the East India Company different from early colonies like Jamestown?",
        options: [
            "It was run directly by the King.",
            "It focused purely on capturing land for farming.",
            "It was a wealthy, militarised corporation focused on controlling trade networks."
        ],
        answer: 2,
        explanation: "The EIC was a powerful joint-stock company focused on trade, eventually building its own army."
    }
});

// Lesson 5: Split the long narrative block & Hinge Question
const longBlockIndex = unit.lessons[4].narrative_blocks.findIndex(b => b.title && b.title.includes('The Reality of the Middle Passage'));
if (longBlockIndex !== -1) {
    const originalBlock = unit.lessons[4].narrative_blocks[longBlockIndex];
    // We'll keep the text, but just ensure it's not overwhelmingly long. The user asked to "break the longest narrative block into two smaller tasks".
    // I will split the tasks so it's less daunting.
    if (originalBlock.tasks && originalBlock.tasks.length > 2) {
        const tasksPart2 = originalBlock.tasks.splice(2);
        unit.lessons[4].narrative_blocks.splice(longBlockIndex + 1, 0, {
            title: "Analyzing the Middle Passage Further",
            text: "Continue your analysis of this horrifying historical reality.",
            tasks: tasksPart2
        });
    }
}
unit.lessons[4].narrative_blocks.push({
    title: "Plenary Check",
    text: "Let's review the key themes of resistance in the Transatlantic Slave Trade.",
    hinge_question: {
        question: "Why is it historically inaccurate to view enslaved Africans simply as passive victims?",
        options: [
            "Because slavery only lasted for a short time.",
            "Because there was continuous resistance, from mutinies on ships to guerrilla wars led by Maroons.",
            "Because the British government eventually banned it."
        ],
        answer: 1,
        explanation: "Enslaved people constantly fought back, preserving their humanity and actively resisting."
    }
});

// 2. Timeline Events
const newEvents = [
    { date: "1569", title: "Mercator World Map", description: "Gerardus Mercator published his famous world map, revolutionising navigation for European sailors.", icon: "fa-solid fa-map", theme: "Exploration & Trade" },
    { date: "1577-1580", title: "Drake's Circumnavigation", description: "Sir Francis Drake became the first Englishman to circumnavigate the globe, plundering Spanish ships along the way.", icon: "fa-solid fa-ship", theme: "Exploration & Trade" },
    { date: "1600", title: "East India Company Founded", description: "Queen Elizabeth I granted a royal charter to the EIC, creating a joint-stock monopoly on trade with Asia.", icon: "fa-solid fa-coins", theme: "Exploration & Trade" },
    { date: "1694", title: "Bank of England Founded", description: "Created to help fund the government's debt, it triggered a 'Financial Revolution' in Britain.", icon: "fa-solid fa-building-columns", theme: "Conflict & Power" }
];
unit.timeline.push(...newEvents);
unit.timeline.sort((a, b) => parseInt(a.date) - parseInt(b.date));

// 3. Key Individuals
unit.key_individuals = [
    { name: "Niccolò Barbaro", role: "Venetian Doctor & Merchant", lifespan: "c. 1420 – 1494", bio: "A Venetian who was present in Constantinople during the Ottoman siege in 1453. He wrote a famous eyewitness diary detailing the fall of the city.", image: "/images/individuals/niccolo_barbaro.jpg" },
    { name: "Sultan Mehmed II", role: "Ottoman Sultan", lifespan: "1432 – 1481", bio: "Known as 'The Conqueror', he captured Constantinople at age 21, destroying the Byzantine Empire and transforming the city into the jewel of the Islamic world.", achievements: ["Conquered Constantinople (1453)", "Expanded the Ottoman Empire into Europe"], image: "/images/individuals/sultan_mehmed_ii.jpg" },
    { name: "Mansa Musa", role: "Emperor of Mali", lifespan: "c. 1280 – 1337", bio: "The famously wealthy ruler of the Mali Empire. His pilgrimage to Mecca in 1324 demonstrated the vast gold wealth of West Africa to the rest of the world.", image: "/images/individuals/mansa_musa.jpg" },
    { name: "Christopher Columbus", role: "Explorer", lifespan: "1451 – 1506", bio: "An Italian explorer funded by Spain. His 1492 voyage to find a western sea route to Asia accidentally encountered the Americas, changing world history forever.", actions: "Initiated European colonisation of the Americas.", image: "/images/individuals/christopher_columbus.jpg" },
    { name: "Martin Luther", role: "German Monk & Theologian", lifespan: "1483 – 1546", bio: "A German monk who sparked the Protestant Reformation in 1517 by challenging the corruption of the Catholic Church. This triggered centuries of religious conflict.", image: "/images/individuals/martin_luther.jpg" },
    { name: "Sir Francis Drake", role: "English Privateer & Explorer", lifespan: "c. 1540 – 1596", bio: "A famous English sea captain, privateer, and explorer. He circumnavigated the globe and helped defeat the Spanish Armada in 1588.", image: "/images/individuals/francis_drake.jpg" },
    { name: "Queen Elizabeth I", role: "Queen of England", lifespan: "1533 – 1603", bio: "Ruled England during a 'Golden Age'. She oversaw the defeat of the Spanish Armada and the founding of the East India Company, strengthening England's global position.", image: "/images/individuals/elizabeth_i.jpg" },
    { name: "Pocahontas", role: "Powhatan Diplomat", lifespan: "c. 1596 – 1617", bio: "A Native American woman who played a crucial role in the survival of the Jamestown colony. She later travelled to England, where she was treated as royalty.", image: "/images/individuals/pocahontas.jpg" },
    { name: "King Charles I", role: "King of England", lifespan: "1600 – 1649", bio: "His belief in the 'Divine Right of Kings' led to the English Civil War. He was tried and executed by Parliament in 1649.", image: "/images/individuals/charles_i.jpg" },
    { name: "Oliver Cromwell", role: "Lord Protector", lifespan: "1599 – 1658", bio: "A Puritan military leader who commanded the Parliamentarian army in the Civil War. He ruled England as a republic ('The Protectorate') after Charles I's execution.", image: "/images/individuals/oliver_cromwell.jpg" },
    { name: "Olaudah Equiano", role: "Abolitionist & Writer", lifespan: "c. 1545 – 1597", bio: "An enslaved African who bought his own freedom and wrote a bestselling autobiography exposing the horrors of the Transatlantic Slave Trade.", image: "/images/individuals/olaudah_equiano.jpg" }
];

// 4. Geographical Locations
unit.geographical_locations = [
    { name: "Constantinople (Istanbul)", region: "Ottoman Empire (Modern Turkey)", coordinates: "41° 0' N, 28° 57' E", description: "The ancient capital of the Byzantine Empire. When it was captured by the Ottomans in 1453, it blocked European access to the Silk Road, forcing them to explore new sea routes.", image: "/images/locations/constantinople.jpg" },
    { name: "Guangzhou (Canton)", region: "Qing Dynasty (China)", coordinates: "23° 7' N, 113° 15' E", description: "A massive, wealthy port city. European merchants (like the British East India Company) were restricted to trading only in a small area of the city, desperate for Chinese tea and silk.", image: "/images/locations/canton.jpg" },
    { name: "Jamestown", region: "Virginia (North America)", coordinates: "37° 12' N, 76° 46' W", description: "The first permanent English settlement in the Americas (1607). Early colonists struggled with starvation and disease until they discovered how to grow tobacco.", image: "/images/locations/jamestown.jpg" },
    { name: "Potosí", region: "Viceroyalty of Peru (Modern Bolivia)", coordinates: "19° 35' S, 65° 45' W", description: "A Spanish colonial mining city. Enslaved Indigenous people were forced to mine thousands of tons of silver from the 'Cerro Rico' mountain, financing the Spanish Empire.", image: "/images/locations/potosi.jpg" },
    { name: "Timbuktu", region: "Mali Empire (West Africa)", coordinates: "16° 46' N, 3° 0' W", description: "A wealthy and sophisticated city in West Africa. It was a center of global trade (gold and salt) and Islamic learning, boasting vast libraries and a famous university.", image: "/images/locations/timbuktu.jpg" }
];

const output = 'export const unitData = ' + JSON.stringify(unit, null, 2) + ';\n';
fs.writeFileSync('early_modern_world/data.js', output, 'utf8');
console.log('Successfully patched early_modern_world/data.js with new pedagogical fixes, timeline, individuals, and locations.');
