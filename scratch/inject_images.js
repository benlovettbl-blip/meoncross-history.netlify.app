const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'cme_new', 'data.js');
let dataContent = fs.readFileSync(filePath, 'utf8');
const jsonContent = dataContent.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

function addSource(lessonId, src, title, caption) {
    const lesson = unitData.lessons.find(l => l.id === lessonId);
    if (!lesson) {
        console.log("Could not find lesson:", lessonId);
        return;
    }
    if (!lesson.sources) {
        lesson.sources = [];
    }
    // Check if it already exists to avoid duplicates
    if (!lesson.sources.find(s => s.src === src)) {
        lesson.sources.push({
            title: title,
            src: src,
            caption: caption
        });
        console.log(`Added ${src} to ${lessonId}`);
    }
}

// 1. Exodus Ship -> Lesson 1
addSource('lesson_1', 'assets/exodus_ship.jpg', 'Reference Image: The SS Exodus (1947)', 'Jewish Holocaust survivors aboard the SS Exodus, intercepted by the British Navy and turned away from Palestine, sparking global outrage.');

// 2. Nasser Suez -> Lesson 3
addSource('lesson_3', 'assets/nasser_suez.png', 'Reference Image: Gamal Abdel Nasser', 'Egyptian President Gamal Abdel Nasser, who nationalized the Suez Canal in 1956.');

// 3. Yom Kippur -> Lesson 6
addSource('lesson_6', 'assets/yom_kippur_crossing.png', 'Reference Image: The Yom Kippur War (1973)', 'Egyptian forces launching Operation Badr, successfully crossing the Suez Canal and breaching the Bar Lev Line on 6 October 1973.');

// 4. Camp David -> Lesson 7
addSource('lesson_7', 'assets/camp_david_accords.png', 'Reference Image: The Camp David Accords (1978)', 'Egyptian President Anwar Sadat, US President Jimmy Carter, and Israeli Prime Minister Menachem Begin shaking hands after agreeing to the Camp David framework.');

// 5. First Intifada -> Lesson 8
addSource('lesson_8', 'assets/first_intifada.png', 'Reference Image: The First Intifada (1987)', 'A Palestinian youth throwing a stone at an Israeli tank during the First Intifada, highlighting the asymmetric nature of the conflict.');


// Write back
const output = `export const unitData = ${JSON.stringify(unitData, null, 2)};`;
fs.writeFileSync(filePath, output, 'utf8');
console.log("Updated cme_new/data.js with new visual sources.");
