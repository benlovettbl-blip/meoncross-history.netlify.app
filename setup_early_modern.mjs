import fs from 'fs';
import path from 'path';

const newUnitId = 'early_modern_world';
const srcUnit = 'great_war';

// 1. Copy directory (Node.js recursive copy)
function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    let entries = fs.readdirSync(src, { withFileTypes: true });
    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);
        entry.isDirectory() ? copyDir(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
    }
}
if (fs.existsSync(newUnitId)) {
    fs.rmSync(newUnitId, { recursive: true, force: true });
}
copyDir(srcUnit, newUnitId);

// 2. Update app.js and index.html
const appJsPath = path.join(newUnitId, 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');
appJs = appJs.replace(/great_war/g, newUnitId);
fs.writeFileSync(appJsPath, appJs);

const indexHtmlPath = path.join(newUnitId, 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
indexHtml = indexHtml.replace(/great_war/g, newUnitId);
fs.writeFileSync(indexHtmlPath, indexHtml);

// 3. Write data.js
const lessonTitles = [
    "Who held global power in 1450?",
    "How did religious conflict trigger global exploration (1517–1588)?",
    "Trade or takeover: How did early encounters turn into empire?",
    "Who controlled Britain: The King, Parliament, or Imperial Profits?",
    "How did enslaved Africans resist the Transatlantic Slave Trade?",
    "How 'modern' was Britain by 1750?"
];

const lessons = lessonTitles.map((title, index) => {
    return {
        id: `lesson_${index + 1}`,
        title: title,
        teacher_notes: {
            primer: `This lesson focuses on: ${title}. Students will explore the key events and concepts.`,
            objectives: [
                {
                    objective: `Understand the core themes of ${title}.`,
                    primer: `Guide students through the narrative, focusing on key historical shifts.`,
                    question: `What is the most significant takeaway from this lesson?`
                }
            ]
        },
        do_now: {
            title: "Do Now: Recall",
            type: "quiz",
            questions: [
                {
                    question: "Recall question from previous lesson.",
                    options: ["A", "B", "C", "D"],
                    answer: 0,
                    explanation: "Explanation."
                }
            ]
        },
        narrative_blocks: [
            {
                title: "Introduction",
                text: "Placeholder narrative.",
                tasks: [
                    {
                        type: "text",
                        text: "Task 1: Placeholder task.",
                        model: "Model answer placeholder."
                    }
                ]
            }
        ]
    };
});

const dataJsContent = `export const unitData = {
    "title": "Early Modern World & Global Encounters (1450–1750)",
    "homepage_background": "/images/bg_great_war.jpg",
    "enquiry": "How 'global' was Britain's transformation between 1450 and 1750?",
    "cover_image": "/assets/placeholder.jpg",
    "cover_caption": "Early Modern World 1450-1750.",
    "printable_workbooks": [
        {
            "title": "Unit Workbook",
            "url": "workbook.html"
        }
    ],
    "lessons": ${JSON.stringify(lessons, null, 4)}
};`;

fs.writeFileSync(path.join(newUnitId, 'data.js'), dataJsContent);
console.log("Created unit early_modern_world");
