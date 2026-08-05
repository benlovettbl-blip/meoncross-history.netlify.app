import fs from 'fs';
import path from 'path';

const newUnitId = 'industrialisation_and_empire';
const srcUnit = 'great_war';

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

// Update app.js and index.html
const appJsPath = path.join(newUnitId, 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');
appJs = appJs.replace(/great_war/g, newUnitId);
fs.writeFileSync(appJsPath, appJs);

const indexHtmlPath = path.join(newUnitId, 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
indexHtml = indexHtml.replace(/great_war/g, newUnitId);
fs.writeFileSync(indexHtmlPath, indexHtml);

// Write data.js
const lessonTitles = [
    "What powered the Industrial Revolution? (Shift to steam/factories; Case Study: Henry Cort at Funtley Ironworks)",
    "Was industrial work progress or punishment? (Factory conditions, child labor; Case Study: Funtley Clay Pits & Fareham Brickfields)",
    "Did industrialisation make British towns unlivable? (Urbanisation, Cholera, Public Health; Case Study: Fareham Red Bricks built Portsmouth & London)",
    "How was the British Empire built and sustained? (Trade, Raj in India, Naval supremacy; Case Study: Portsmouth Dockyard & Royal Navy)",
    "How did ordinary people fight for a voice? (Peterloo, Chartism, Trade Unions; Case Study: Hampshire Swing Riots)",
    "How did the road to democracy expand? (Reform Acts 1832–1884, Secret Ballot; Case Study: Hampshire MPs & Pocket Boroughs)",
    "Who party truly benefited from 19th-century transformation? (Synthesis essay balancing economic growth vs. exploitation)"
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
    "title": "Industrialisation, Empire, and Power (1750–1900)",
    "homepage_background": "/images/bg_great_war.jpg",
    "enquiry": "Industrialisation, Empire, and Power: How did 19th-century Britain transform at home and abroad?",
    "cover_image": "/assets/placeholder.jpg",
    "cover_caption": "Industrialisation, Empire, and Power.",
    "printable_workbooks": [
        {
            "title": "Unit Workbook",
            "url": "workbook.html"
        }
    ],
    "lessons": ${JSON.stringify(lessons, null, 4)}
};`;

fs.writeFileSync(path.join(newUnitId, 'data.js'), dataJsContent);
console.log("Created unit industrialisation_and_empire");
