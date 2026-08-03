const fs = require('fs');

const dataPath = './weimar_nazi_germany/data.js';
let fileContent = fs.readFileSync(dataPath, 'utf8');

// Use regex or eval to modify the file safely
const match = fileContent.match(/export const unitData = ([\s\S]+);/);
if (!match) {
    console.error("Could not parse data.js");
    process.exit(1);
}

let unitData;
try {
    eval('unitData = ' + match[1]);
} catch (e) {
    console.error("Eval failed:", e);
    process.exit(1);
}

const taskStyles = [
    [
        {
            "question": "Causal Linkage: Write a short paragraph explaining the causes of [Key Event] in this lesson.",
            "model": "[Placeholder for model answer]"
        },
        {
            "question": "Constrained Summary: Summarize the significance of [Key Person/Event] in exactly 12 words.",
            "model": "[Placeholder for model answer]"
        }
    ],
    [
        {
            "question": "The 'But/Because/So' Strategy: Complete these three sentences with historically accurate details: 1) [Event] was significant, BUT... 2) [Person] acted BECAUSE... 3) [Outcome] happened, SO...",
            "model": "[Placeholder for model answer]"
        },
        {
            "question": "Transforming Information: Imagine you are [Historical Figure]. Write a short memo explaining your actions during [Event].",
            "model": "[Placeholder for model answer]"
        }
    ],
    [
        {
            "question": "Vocabulary in Context: Write a 4-sentence summary of this lesson. You must use all five of these keywords correctly: [Keyword 1], [Keyword 2], [Keyword 3], [Keyword 4], [Keyword 5].",
            "model": "[Placeholder for model answer]"
        },
        {
            "question": "The 'Diamond Ranking' Challenge: You have been given four reasons why [Event] occurred. Rank these causes in order of importance. Write a persuasive paragraph justifying your #1 choice over your #2 choice.",
            "model": "[Placeholder for model answer]"
        }
    ]
];

unitData.lessons.forEach((lesson, index) => {
    if (lesson.id === 'lesson_1_1') return; // Already has it

    // Inject tasks rotating through the 3 styles
    const styleIndex = index % 3;
    lesson.tasks = taskStyles[styleIndex];

    // Inject exam practice
    lesson.exam_practice = {
        "stimulus": [
            {
                "title": "Interpretation 1: From a modern historian, evaluating [Topic].",
                "content": "\"[Placeholder: Insert interpretation 1 text here]\""
            },
            {
                "title": "Interpretation 2: From a modern historian, evaluating [Topic].",
                "content": "\"[Placeholder: Insert interpretation 2 text here]\""
            },
            {
                "title": "Source C: [Placeholder for Source C title]",
                "content": "\"[Placeholder: Insert Source C text here]\""
            },
            {
                "title": "Source D: [Placeholder for Source D title]",
                "content": "\"[Placeholder: Insert Source D text here]\""
            }
        ],
        "questions": [
            {
                "question": "2. Explain why [Topic] was significant (12 marks).<br><br>You may use the following in your answer:<ul style=\"margin-top: 5px; margin-bottom: 10px;\"><li>[Bullet 1]</li><li>[Bullet 2]</li></ul>You must also use information of your own.",
                "model": "[Placeholder for 12-mark model answer]"
            },
            {
                "question": "3a. How useful are Sources C and D for an enquiry into [Topic]? Explain your answer, using Sources C and D and your knowledge of the historical context. (8 marks)",
                "model": "[Placeholder for 8-mark model answer]"
            },
            {
                "question": "3b. Study Interpretations 1 and 2. They give different views about [Topic]. What is the main difference between these views? (4 marks)",
                "model": "[Placeholder for 4-mark model answer]"
            },
            {
                "question": "3c. Suggest one reason why Interpretation 1 and Interpretation 2 give different views about [Topic]. You may use Sources C and D to help explain your answer. (4 marks)",
                "model": "[Placeholder for 4-mark model answer]"
            },
            {
                "question": "3d. How far do you agree with Interpretation 2 about [Topic]? Explain your answer, using both interpretations and your knowledge of the historical context. (16 marks)",
                "model": "[Placeholder for 16-mark model answer]"
            }
        ]
    };
});

// Write back to file
const newContent = 'export const unitData = ' + JSON.stringify(unitData, null, 4) + ';\n';
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log("Successfully injected tasks and exam_practice into all lessons.");
