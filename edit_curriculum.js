const fs = require('fs');

const dataPath = 'early_modern_world/data.js';
let content = fs.readFileSync(dataPath, 'utf8');

// Parse JSON safely
const jsonStr = content.replace('export const unitData = ', '').replace(/;\s*$/, '');
const data = JSON.parse(jsonStr);

// Clean up the malformed first quiz array in lesson 6 by just filtering it if it exists inside the lesson.
// Actually, JSON.parse already ignored the first duplicate key! So it's ALREADY clean in `data`.
// When we JSON.stringify, it will only have one 'quiz' key.

// ==========================================
// Lesson 1 Updates
// ==========================================
const l1 = data.lessons.find(l => l.id === 'lesson_1');
if (l1) {
    // 1. How Useful Source Assessment for Kritovoulos
    const sourceBlock = l1.narrative_blocks.find(b => b.title.includes('Primary Source Analysis'));
    if (sourceBlock) {
        sourceBlock.tasks.push({
            type: "text",
            text: "How useful is Source A for an inquiry into the fall of Constantinople? (8 marks)",
            provenance_clues: [
                "Who was Kritovoulos? What was his motive for writing?",
                "Who was the intended audience for this account?",
                "When was it written in relation to the event?"
            ],
            model: "Source A is highly useful because it provides an eyewitness account from a Greek scholar present in 1453. However, students should consider that Kritovoulos wrote this shortly after the conquest while living under Ottoman rule, which may have influenced him to exaggerate the Sultan's 'absolute power' to curry favor or avoid persecution."
        });
    }

    // 2. Expand Eurocentric Myth for Frankopan Debate
    const mythBlock = l1.narrative_blocks.find(b => b.title.includes('Eurocentric Myth'));
    if (mythBlock) {
        mythBlock.tasks = mythBlock.tasks || [];
        mythBlock.tasks.unshift({
            type: "debate",
            text: "Class Debate: Based on Professor Frankopan's argument, why might traditional European textbooks have deliberately ignored the wealth of the East in 1450?",
            model: "Traditional textbooks may have minimized Eastern wealth to justify later European imperialism, creating a narrative where Europe 'civilized' the rest of the world rather than acknowledging that Europe was initially an isolated, desperate outpost seeking access to superior Eastern economies."
        });
    }
}

// ==========================================
// Lesson 2 Updates
// ==========================================
const l2 = data.lessons.find(l => l.id === 'lesson_2');
if (l2) {
    // Features question on Spanish Armada
    const armadaBlock = l2.narrative_blocks.find(b => b.title.includes('Armada'));
    if (armadaBlock) {
        armadaBlock.tasks = armadaBlock.tasks || [];
        armadaBlock.tasks.push({
            type: "features",
            text: "Describe one feature of the Spanish Armada's structural flaws.",
            marks: 2,
            model: "One feature was the design of the galleons. They were huge, heavy transport ships built for boarding tactics, which made them slow and unmaneuverable in the rough winds of the English Channel."
        });
        armadaBlock.tasks.push({
            type: "features",
            text: "Describe one feature of the Spanish Armada's structural flaws.",
            marks: 2,
            model: "Another feature was the lack of deep-water ports. The Armada's crescent formation was broken because they had to anchor in the shallow, exposed waters off Calais to wait for troops, leaving them vulnerable to English fireships."
        });
    }
}

// ==========================================
// Lesson 3 Updates
// ==========================================
const l3 = data.lessons.find(l => l.id === 'lesson_3');
if (l3) {
    // 1. Reliability of Pocahontas engraving
    const pBlock = l3.narrative_blocks.find(b => b.title.includes('Pocahontas'));
    if (pBlock) {
        pBlock.tasks = pBlock.tasks || [];
        pBlock.tasks.push({
            type: "text",
            text: "Evaluate the reliability of the 1616 engraving of Matoaka (Pocahontas). Why might the Virginia Company have wanted her depicted in this specific English court fashion?",
            model: "The engraving is highly unreliable as a reflection of Native American culture, but it is excellent evidence of colonial propaganda. The Virginia Company funded this portrait to depict her as a 'civilized', Christian convert (Rebecca) to convince wealthy London investors that the colony was safe, successful, and peacefully assimilating the Indigenous population."
        });
    }

    // 2. Roanoke scaffolding on causation
    const rBlock = l3.narrative_blocks.find(b => b.title.includes('Roanoke'));
    if (rBlock && rBlock.tasks) {
        const rTask = rBlock.tasks.find(t => t.text.includes('Roanoke'));
        if (rTask) {
            rTask.text = "Analyze the causal factors that led to the collapse of the Roanoke colony. Rank the following factors from most significant to least: Lack of supplies, Hostile relations with the Secotan, Poor leadership, and Geographic isolation.";
            rTask.model = "Students should prioritize the factors causally. For example, poor leadership and aggressive tactics caused the breakdown in relations with the Secotan tribe. This hostile environment meant they could not trade for food when their own supplies ran out, ultimately leading to the colony's collapse.";
        }
    }
}

// ==========================================
// Lesson 4 Updates
// ==========================================
const l4 = data.lessons.find(l => l.id === 'lesson_4');
if (l4) {
    // 1. Historiographical block Hill vs Williams & EIC visual source
    l4.narrative_blocks.push({
        title: "Historiographical Debate: Who won the English Civil War?",
        text: "<div class='scaffold-box'><strong>Interpretation A: Professor Christopher Hill (The Political View)</strong><br><em>\"The English Civil War was a revolutionary class struggle. It permanently smashed the absolute monarchy and the old feudal order, transferring political power to Parliament and the middling sorts.\"</em></div><br><br><div class='scaffold-box'><strong>Interpretation B: Professor Eric Williams (The Imperial/Economic View)</strong><br><em>\"The true victors of the 17th century were the imperial merchant classes. By restricting the monarchy, Parliament secured the political stability needed to build the massive joint-stock companies (like the East India Company and the Royal African Company) which extracted vast wealth through colonization and slavery.\"</em></div>",
        image: "/images/sources/east_india_docks.jpg",
        image_alt: "East India Company Docks",
        image_caption: "The docks of the British East India Company in London, bustling with global trade and imperial wealth.",
        tasks: [
            {
                "type": "comprehension",
                "question": "Which historian argues that the conflict was primarily about political and class rights, and which argues it was about establishing the conditions for global capitalism and empire?",
                "model_answer": "Professor Christopher Hill focuses on the political revolution and the destruction of the absolute monarchy. Professor Eric Williams argues the true victory was economic, laying the foundation for imperial merchants and global joint-stock capitalism."
            }
        ]
    });
}

// ==========================================
// Lesson 5 Updates
// ==========================================
const l5 = data.lessons.find(l => l.id === 'lesson_5');
if (l5) {
    // 1. Hinge Question in Teacher Notes for Brookes ship
    if (!l5.teacher_notes) l5.teacher_notes = { objectives: [] };
    l5.teacher_notes.objectives.push({
        objective: "Understand the inhumanity and scale of the Middle Passage.",
        primer: "Display the Brookes ship source. Ask students to calculate the physical space allocated to individuals.",
        question: "Hinge Question: Does the Brookes ship diagram primarily show us how enslavers maximized profit, or does it show us the suffering of the enslaved? Can a source show both unintentionally?"
    });

    // 2. Expand Jamaican Maroons resistance
    const mBlock = l5.narrative_blocks.find(b => b.title.includes('Maroons'));
    if (mBlock) {
        mBlock.text = mBlock.text.replace('They formed independent communities in the mountains.', 'They formed highly organized, militarized communities in the rugged interior mountains. Led by tactical geniuses like Queen Nanny, the Maroons waged devastating guerrilla warfare against British colonial troops. Their resistance was so fierce and successful that the British Empire was forced to sign the 1739 peace treaties, officially recognizing their autonomy and land rights—proving that enslaved people actively and violently shattered the machinery of slavery rather than just passively enduring it.');
    }
}

// ==========================================
// Lesson 6 Updates
// ==========================================
const l6 = data.lessons.find(l => l.id === 'lesson_6');
if (l6) {
    // 1. Limitations of "modernity" in essay
    const essayBlock = l6.narrative_blocks.find(b => b.title.includes('Synthesis Essay'));
    if (essayBlock) {
        essayBlock.text = essayBlock.text.replace('Define "modernity" and state your thesis line.', 'Define "modernity", state your thesis line, and immediately address the limitations of the term (e.g. who is excluded from this "modernity"?).');
    }

    // 2. Refactor Do Now to test recall from previous lessons
    if (l6.do_now && l6.do_now.items) {
        l6.do_now.items = [
            { question: "What was the primary function of the 1607 Jamestown Fort design?", answer: "Defense against both Spanish attacks and the local Powhatan confederacy." },
            { question: "Why did Oliver Cromwell execute King Charles I in 1649?", answer: "For committing high treason against Parliament and the English people." },
            { question: "What was the strategic advantage of the Jamaican Maroons' location?", answer: "The rugged, mountainous terrain allowed them to launch devastating guerrilla attacks on British plantations while remaining virtually impossible for the British army to conquer." },
            { question: "What motivated the creation of the Royal African Company?", answer: "To monopolize the highly profitable Transatlantic Slave Trade for the British Crown and its merchants." }
        ];
    }
}

// Write it back
const outputStr = `export const unitData = ${JSON.stringify(data, null, 4)};\n`;
fs.writeFileSync(dataPath, outputStr);
console.log('Successfully updated early_modern_world/data.js');
