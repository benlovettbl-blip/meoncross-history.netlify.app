const fs = require('fs');

let file = 'great_war_part2/data.js';
let content = fs.readFileSync(file, 'utf8');
let dbText = content.replace('export const unitData = ', '').trim();
if (dbText.endsWith(';')) dbText = dbText.slice(0, -1);
let db = eval('(' + dbText + ')');

// The current exam practices are shifted by one!
// Lesson 0 (Recruitment) currently has Lesson 1 (Trenches)
// Lesson 1 (Trenches) currently has Lesson 2 (Empire)
// Lesson 2 (Empire) currently has Lesson 3 (DORA)
// Lesson 3 (DORA) currently has Lesson 4 (Versailles)
// Lesson 4 (Versailles) currently has Lesson 5 (Stubbington)
// Lesson 5 (Stubbington) currently has Lesson 5 (Stubbington)

let lesson1Exam = db.lessons[0].exam_practice; // Trenches
let lesson2Exam = db.lessons[1].exam_practice; // Empire
let lesson3Exam = db.lessons[2].exam_practice; // DORA
let lesson4Exam = db.lessons[3].exam_practice; // Versailles
let lesson5Exam = db.lessons[4].exam_practice; // Stubbington

// Create a new exam practice for Lesson 0 (Recruitment)
let lesson0Exam = {
    "questions": [
        {
            "type": "explain",
            "question": "Explain why so many young British men eagerly volunteered for the army in 1914.",
            "marks": 8,
            "hints": [
                "Sentence Starter: Many young men volunteered because they were influenced by government propaganda...",
                "Sentence Starter: For example, posters like Lord Kitchener's \"Your Country Needs You\" used...",
                "Sentence Starter: Furthermore, societal pressure from women, such as the White Feather campaign, resulted in..."
            ]
        }
    ]
};

// Now assign them correctly
db.lessons[0].exam_practice = lesson0Exam;
db.lessons[1].exam_practice = lesson1Exam;
db.lessons[2].exam_practice = lesson2Exam;
db.lessons[3].exam_practice = lesson3Exam;
db.lessons[4].exam_practice = lesson4Exam;
db.lessons[5].exam_practice = lesson5Exam; // Keep the original Stubbington one here

let newContent = 'export const unitData = ' + JSON.stringify(db, null, 4) + ';\n';
fs.writeFileSync(file, newContent);
console.log("Successfully fixed exam practice shifting in great_war_part2/data.js");
