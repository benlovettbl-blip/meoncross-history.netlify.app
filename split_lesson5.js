const fs = require('fs');

const content = fs.readFileSync('early_modern_world/data.js', 'utf8');
const match = content.match(/export const unitData = ([\s\S]+);/);
if (!match) {
    console.error("Could not parse data.js");
    process.exit(1);
}

const data = eval('(' + match[1] + ')');

const l5 = data.lessons[4];
const l6 = data.lessons[5]; // The old lesson 6

// Create new Lesson 5 (Mechanics)
const newLesson5 = {
    id: "lesson_5",
    title: "What were the mechanics of the Transatlantic Slave Trade?",
    enquiry: "What were the mechanics of the Transatlantic Slave Trade? (Triangular Trade, Plantation economics, Legacies of British Slavery)",
    teacher_notes: {
        primer: "This lesson unpacks the brutal mechanics of the Transatlantic Slave Trade, focusing on the Triangular Trade system and how plantation economics generated immense wealth that shaped modern Britain.",
        objectives: [
            {
                objective: "Understand the Triangular Trade and the middle passage.",
                primer: "Focus on the Macro-History block to explain the flow of goods, enslaved people, and wealth.",
                question: "What were the three main 'legs' of the Triangular Trade?"
            },
            {
                objective: "Evaluate the economic legacy of slavery on Britain.",
                primer: "Use the Digital Research Task to show how slave-generated wealth funded modern British institutions.",
                question: "How did the wealth from the slave trade continue to benefit Britain long after abolition?"
            }
        ]
    },
    vocab: [
        {
            term: "Triangular Trade",
            definition: "The three-legged transatlantic trade network connecting Europe, Africa, and the Americas."
        },
        {
            term: "Middle Passage",
            definition: "The brutal forced voyage of enslaved Africans across the Atlantic Ocean."
        },
        {
            term: "Plantation",
            definition: "A large agricultural estate where enslaved people were forced to grow cash crops like sugar and tobacco."
        }
    ],
    learning_objectives: {
        overarching: "What were the mechanics of the Transatlantic Slave Trade?",
        scaffolded: [
            "Understand the Triangular Trade and the middle passage.",
            "Evaluate the economic legacy of slavery on Britain."
        ]
    },
    narrative_blocks: [
        l5.narrative_blocks.find(b => b.title.includes("Macro-History")),
        l5.narrative_blocks.find(b => b.title.includes("Digital Research Task")),
        {
            title: "Plenary Check",
            text: "Let's review the mechanics of the Transatlantic Slave Trade.",
            hinge_question: {
                question: "Which of the following best describes the 'Middle Passage'?",
                options: [
                    "The journey of manufactured goods from Europe to Africa.",
                    "The brutal forced voyage of enslaved Africans across the Atlantic.",
                    "The transport of sugar and tobacco from the Americas to Europe.",
                    "The overland trade routes within the African continent."
                ],
                answer: 1,
                explanation: "The Middle Passage specifically refers to the horrific voyage across the Atlantic Ocean where millions of enslaved Africans were transported to the Americas in horrific conditions."
            },
            tasks: []
        }
    ]
};

// Create new Lesson 6 (Resistance)
const newLesson6 = {
    id: "lesson_6",
    title: "How did enslaved Africans resist the Transatlantic Slave Trade?",
    enquiry: "How did enslaved Africans resist the Transatlantic Slave Trade? (Covert resistance, Obeah, Armed Rebellions)",
    teacher_notes: {
        primer: "This lesson aims to dismantle the passive victim narrative of enslaved people by centering their active resistance (both covert and overt) against their enslavers.",
        objectives: [
            {
                objective: "Analyze primary sources from formerly enslaved Africans.",
                primer: "Use the Primary Source Deep Dive to interrogate authentic voices.",
                question: "How does Equiano's account challenge the idea that enslaved people were passive?"
            },
            {
                objective: "Investigate the Jamaican Maroon Wars.",
                primer: "Use the Micro-History of Queen Nanny to explore armed rebellion.",
                question: "Why were the Jamaican Maroons so difficult for the British military to defeat?"
            }
        ]
    },
    vocab: [
        {
            term: "Obeah",
            definition: "A system of spiritual and healing practices developed by enslaved people in the Caribbean, often involving botanical knowledge."
        },
        {
            term: "Maroons",
            definition: "Communities of formerly enslaved Africans who escaped and established free settlements in mountainous or remote areas."
        },
        {
            term: "Covert Resistance",
            definition: "Hidden or secretive acts of rebellion, such as working slowly or breaking tools."
        }
    ],
    learning_objectives: {
        overarching: "How did enslaved Africans resist the Transatlantic Slave Trade?",
        scaffolded: [
            "Understand the different forms of covert and overt resistance.",
            "Analyze primary sources from formerly enslaved Africans.",
            "Investigate the Jamaican Maroon Wars."
        ]
    },
    narrative_blocks: [
        l5.narrative_blocks.find(b => b.title.includes("Micro-History")),
        l5.narrative_blocks.find(b => b.title.includes("Spectrum of Resistance")),
        l5.narrative_blocks.find(b => b.title.includes("Primary Source Deep Dive")),
        l5.narrative_blocks.find(b => b.title.includes("Side Quest")),
        l5.narrative_blocks.find(b => b.title.includes("Historical Debates")),
        l5.narrative_blocks.find(b => b.title.includes("Plenary Check"))
    ]
};

// Update old Lesson 6 to Lesson 7
const newLesson7 = { ...l6, id: "lesson_7" };

data.lessons[4] = newLesson5;
data.lessons[5] = newLesson6;
data.lessons.push(newLesson7);

// Write back to file
const newDataStr = "export const unitData = " + JSON.stringify(data, null, 2) + ";\n";
fs.writeFileSync('early_modern_world/data.js', newDataStr, 'utf8');

console.log("Successfully split Lesson 5!");
