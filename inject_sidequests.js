const fs = require('fs');

const content = fs.readFileSync('early_modern_world/data.js', 'utf8');
const unitDataString = content.replace(/^export const unitData = /, '').trim().replace(/;$/, '');

let data;
try {
    data = eval('(' + unitDataString + ')');
} catch (e) {
    console.error("Eval failed", e);
    process.exit(1);
}

// Side Quests
const sideQuests = [
    // Lesson 1
    {
        title: "Side Quest: The English Peasant's Pottage",
        source_letter: "D",
        image: "/images/sidequest_peasant.jpg",
        image_alt: "Peasants farming, Luttrell Psalter",
        image_caption: "An authentic 15th-century manuscript illumination showing peasants performing grueling manual agricultural labor.",
        text: "<details class=\"side-quest-box\">\n  <summary>⚔️ Side Quest: The English Peasant's Pottage</summary>\n  <p>While the Oba of Benin commissioned magnificent bronze plaques and Ming Emperors wore silk, the vast majority of people in 1450 England were destitute peasant farmers. An ordinary English peasant lived in a dark, smokey, single-room wattle-and-daub hut shared with their livestock. Their diet was incredibly monotonous, consisting almost entirely of 'pottage'—a thick, bland stew of boiled cabbage, peas, and oats. They rarely travelled more than five miles from their birthplace and were completely oblivious to the vast riches flowing through the Silk Road or the trans-Saharan trade networks. Europe in 1450 was not the center of the world; for the average peasant, it was a cold, isolated struggle for survival.</p>\n</details>",
        tasks: [
            {
                type: "comprehension",
                question: "What was the main diet of an ordinary English peasant in 1450?",
                model_answer: "Their main diet was 'pottage', a bland, thick stew made of boiled cabbage, peas, and oats."
            },
            {
                type: "comprehension",
                question: "How does this peasant's life contrast with the wealth of the Oba of Benin or the Ming Emperor?",
                model_answer: "Unlike the Oba of Benin with his bronze plaques or the Ming Emperor in silk, the English peasant lived in poverty in a dark mud hut shared with animals."
            },
            {
                type: "comprehension",
                question: "Why does this evidence support the idea that Europe was an 'isolated outpost' in 1450?",
                model_answer: "It shows that ordinary Europeans were completely oblivious to the vast wealth of the Silk Road or African trade networks, rarely traveling far from their poor, localized villages."
            },
            {
                type: "comprehension",
                question: "Study Source D. How does this visual source support the idea that everyday life for a peasant was a brutal struggle?",
                model_answer: "The source illustrates peasants performing intense manual agricultural labor, emphasizing that their lives revolved around grueling physical work just to produce enough food to survive."
            }
        ]
    },
    // Lesson 2
    {
        title: "Side Quest: The Horrors of Scurvy",
        source_letter: "G",
        image: "/images/sidequest_scurvy.jpg",
        image_alt: "Drawing of scurvy effects",
        image_caption: "Historical medical documentation illustrating the horrifying effects of scurvy on a sailor's gums and teeth.",
        text: "<details class=\"side-quest-box\">\n  <summary>⚔️ Side Quest: The Horrors of Scurvy</summary>\n  <p>The 'Golden Age of Exploration' is often painted as a heroic era of brave captains claiming glory. But for the ordinary sailors on ships like Francis Drake's Golden Hind, life was a living nightmare of disease and malnutrition. The greatest enemy was not the Spanish navy, but scurvy—a terrifying disease caused by a severe lack of Vitamin C on long voyages. Because fresh fruit spoiled quickly, sailors survived on rock-hard, maggot-infested biscuits and salted beef that had often turned green. Without Vitamin C, a sailor's gums would swell and rot, their teeth would fall out, old wounds would miraculously rip open again, and they would slowly bleed to death internally. On many Elizabethan voyages, more than half the crew died of scurvy before ever seeing combat.</p>\n</details>",
        tasks: [
            {
                type: "comprehension",
                question: "What was the primary cause of scurvy on long oceanic voyages?",
                model_answer: "Scurvy was caused by a severe lack of Vitamin C because fresh fruit spoiled quickly on long voyages."
            },
            {
                type: "comprehension",
                question: "Describe two horrifying physical symptoms of scurvy experienced by Tudor sailors.",
                model_answer: "Symptoms included gums swelling and rotting, teeth falling out, and old wounds ripping open again."
            },
            {
                type: "comprehension",
                question: "Why might history textbooks prefer to focus on the 'glory' of Francis Drake rather than the reality of scurvy?",
                model_answer: "Textbooks often focus on the heroic, patriotic narrative of exploration and victory, rather than the grim, unglamorous suffering of ordinary sailors."
            },
            {
                type: "comprehension",
                question: "Study Source G. Based on this visual evidence, what physical impact did scurvy have on the human body?",
                model_answer: "The image shows severe degradation of the gums and teeth, highlighting the brutal physical decay scurvy caused in the mouth."
            }
        ]
    },
    // Lesson 3
    {
        title: "Side Quest: The Invasion of the Pigs",
        source_letter: "F",
        image: "/images/sidequest_secotan.jpg",
        image_alt: "John White watercolor of Secotan",
        image_caption: "John White's authentic 1585 watercolor painting of the Algonquian village of Secotan, showing their carefully managed, unfenced corn fields.",
        text: "<details class=\"side-quest-box\">\n  <summary>⚔️ Side Quest: The Invasion of the Pigs</summary>\n  <p>When textbooks talk about the English colonization of North America, they focus on guns, land treaties, and tobacco. But one of the most destructive weapons the English brought to Jamestown was the common pig. The Algonquian Powhatan people did not use fences; they carefully managed open forests and planted complex, exposed fields of corn, beans, and squash. The English, however, let their livestock roam wild. Hundreds of English pigs invaded the forests, devouring the natives' crops, destroying the roots of native plants, and wrecking the delicate ecological balance that the Powhatan relied on for survival. For the Indigenous people, the English were not just a military threat; they were an ecological disaster that literally ate the local food supply.</p>\n</details>",
        tasks: [
            {
                type: "comprehension",
                question: "How did Algonquian farming methods differ from English ones?",
                model_answer: "The Algonquian Powhatan planted in exposed, unfenced fields and managed open forests, whereas the English relied on fences and let their livestock roam wild."
            },
            {
                type: "comprehension",
                question: "Explain how free-roaming English pigs became a weapon of ecological destruction.",
                model_answer: "The pigs invaded the forests, devouring native crops and destroying the roots of native plants, wrecking the ecological balance."
            },
            {
                type: "comprehension",
                question: "How does this 'ground-up' detail change our understanding of why Native Americans became hostile to the Jamestown settlers?",
                model_answer: "It shows that hostility wasn't just about politics or land ownership; it was a desperate reaction to an ecological disaster that was literally eating their food supply."
            },
            {
                type: "comprehension",
                question: "Study Source F. What does this watercolor tell us about how the Algonquian Powhatan organized their agriculture?",
                model_answer: "It shows highly organized, neat fields of crops that were unfenced and integrated into the natural environment, leaving them vulnerable to roaming English livestock."
            }
        ]
    },
    // Lesson 4
    {
        title: "Side Quest: The Diggers and the Dream of Equality",
        source_letter: "G",
        image: "/images/sidequest_diggers.jpg",
        image_alt: "The Levellers Standard Advanced pamphlet",
        image_caption: "The authentic title page of the radical 1649 pamphlet 'The True Levellers Standard Advanced' by Gerrard Winstanley.",
        text: "<details class=\"side-quest-box\">\n  <summary>⚔️ Side Quest: The Diggers and the Dream of Equality</summary>\n  <p>History usually remembers the English Civil War as a battle between King Charles I and Oliver Cromwell. But among the ordinary foot soldiers of the New Model Army and the desperate, starving peasants, radical new ideas were brewing. A group known as the Diggers (or True Levellers) believed that the war shouldn't just replace a King with a Parliament; it should wipe out poverty entirely. Led by Gerrard Winstanley in 1649, the Diggers marched onto privately owned land at St George's Hill in Surrey and simply started planting vegetables, declaring that the earth was a 'common treasury for all' and that private property should be abolished. They envisioned a radically modern, equal, bottom-up democracy. Tragically, this was too extreme for Cromwell and the wealthy landowners, who quickly used the army to violently crush the Diggers' camps.</p>\n</details>",
        tasks: [
            {
                type: "comprehension",
                question: "What radical belief did the Diggers hold about private property and the earth?",
                model_answer: "They believed the earth was a 'common treasury for all' and that private property should be completely abolished."
            },
            {
                type: "comprehension",
                question: "Why did wealthy Parliamentarians like Oliver Cromwell violently crush the Diggers?",
                model_answer: "The Diggers' ideas threatened the wealth and power of the landowners, making their vision of total equality too extreme for Parliament."
            },
            {
                type: "comprehension",
                question: "Do you think the Diggers' ideas were 'ahead of their time'? Explain your answer.",
                model_answer: "Yes, because they advocated for ideas like communism, universal equality, and the abolition of poverty centuries before these concepts became mainstream political movements."
            },
            {
                type: "comprehension",
                question: "Study Source G. Based on the title page of this pamphlet, what was the primary goal of the Diggers?",
                model_answer: "The title 'True Levellers Standard Advanced' suggests their goal was to completely 'level' society by removing social classes and establishing absolute equality."
            }
        ]
    },
    // Lesson 5
    {
        title: "Side Quest: Obeah and Botanical Warfare",
        source_letter: "H",
        image: "/images/sidequest_cassava.jpg",
        image_alt: "Botanical illustration of Cassava",
        image_caption: "An 18th-century botanical illustration of the Cassava root, a native plant that could be highly toxic if prepared incorrectly.",
        text: "<details class=\"side-quest-box\">\n  <summary>⚔️ Side Quest: Obeah and Botanical Warfare</summary>\n  <p>When we think of resistance to slavery, we often picture armed rebellions or people running away. But there was a terrifying, silent, and highly intelligent form of psychological and chemical resistance happening right under the enslavers' noses. Enslaved people brought deep spiritual and botanical knowledge from West Africa, which evolved in the Caribbean into a belief system known as Obeah. Obeah practitioners (often women) were deeply respected healers within the enslaved community, possessing expert knowledge of local toxic plants. Because enslaved women often worked in the plantation houses cooking the enslavers' food, they occasionally used this botanical mastery to slowly, undetectably poison brutal overseers and plantation owners. Enslavers lived in a state of constant, paranoid terror of Obeah, passing strict laws to criminalize it.</p>\n</details>",
        tasks: [
            {
                type: "comprehension",
                question: "What was Obeah, and why did it involve botanical knowledge?",
                model_answer: "Obeah was a spiritual belief system brought from West Africa, whose practitioners possessed expert knowledge of local toxic plants and acted as healers."
            },
            {
                type: "comprehension",
                question: "How did enslaved women use their positions in the plantation house to resist their enslavers?",
                model_answer: "They used their positions cooking food to slowly and secretly poison brutal overseers and plantation owners using their botanical knowledge."
            },
            {
                type: "comprehension",
                question: "Why might psychological and chemical resistance have been just as effective as armed rebellion?",
                model_answer: "It was silent, difficult to detect, and created a state of constant, paranoid terror among the enslavers without the immediate risk of a military defeat."
            },
            {
                type: "comprehension",
                question: "Study Source H. How does this botanical illustration help explain the secret power held by Obeah healers?",
                model_answer: "It highlights the deep scientific and botanical knowledge required to understand which local plants were toxic, demonstrating that Obeah was rooted in highly intelligent natural science."
            }
        ]
    },
    // Lesson 6
    {
        title: "Side Quest: The Mudlarks of London",
        source_letter: "D",
        image: "/images/sidequest_mudlark.jpg",
        image_alt: "Mudlarks of London, 1871",
        image_caption: "An authentic drawing of 'Mudlarks' scavenging in the freezing River Thames, showing the extreme poverty that still haunted London.",
        text: "<details class=\"side-quest-box\">\n  <summary>⚔️ Side Quest: The Mudlarks of London</summary>\n  <p>By 1750, wealthy Londoners were discussing Enlightenment science in elegant coffee houses. But for the desperately poor, this 'modern' city was a brutal slum. Driven by plummeting grain prices, a horrifying epidemic known as the Gin Craze gripped the capital. Gin was cheaper than beer and safer to drink than the filthy Thames water, devastating working-class slums with addiction, crime, and starvation. Meanwhile, desperate children known as 'Mudlarks' spent their days wading thigh-deep in the freezing, sewage-filled mud of the River Thames just to scavenge for dropped scraps of coal or copper to sell for a penny. For the urban poor, 1750 did not feel 'modern'—it felt lethal.</p>\n</details>",
        tasks: [
            {
                type: "comprehension",
                question: "Why did the poor of London drink massive quantities of gin in 1750 instead of water?",
                model_answer: "Gin was incredibly cheap due to plummeting grain prices, and it was considered safer to drink than the filthy, sewage-filled water of the Thames."
            },
            {
                type: "comprehension",
                question: "What was a 'Mudlark', and what does their existence tell us about poverty in 1750?",
                model_answer: "Mudlarks were desperate children who scavenged in the freezing mud of the Thames for scraps of coal to sell, showing that extreme, life-threatening poverty still existed."
            },
            {
                type: "comprehension",
                question: "How does this paragraph challenge the idea that Britain had become a fully 'modern' society by 1750?",
                model_answer: "It shows that while the rich enjoyed modern ideas like science and coffee houses, the poor were suffering from addiction, disease, and horrific living conditions."
            },
            {
                type: "comprehension",
                question: "Study Source D. How does this image of Mudlarks contrast with the idea of London being a wealthy, modern capital?",
                model_answer: "The image portrays ragged, desperate children digging in the mud, exposing a dark underbelly of extreme suffering that contradicts the image of a wealthy, civilized Enlightenment city."
            }
        ]
    }
];

// Inject each side quest into the correct lesson's narrative_blocks array
for (let i = 0; i < 6; i++) {
    // Insert just before the final block (which usually contains the synoptic tasks/assessment)
    // Or we can just push it to the end of the narrative blocks, or maybe right before the Synoptic tasks.
    // Let's just push it to the end.
    data.lessons[i].narrative_blocks.push(sideQuests[i]);
}

// Convert back to string and write
const output = `export const unitData = ${JSON.stringify(data, null, 4)};\n`;
fs.writeFileSync('early_modern_world/data.js', output, 'utf8');
console.log("Injected side quests successfully.");
