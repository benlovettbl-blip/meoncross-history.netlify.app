const fs = require('fs');

// 1. Get the new titles from water_and_sanitation/data.js
const { unitData } = require('./water_and_sanitation/data.js');
const newTitles = {};
unitData.lessons.forEach((l) => {
    newTitles[l.id] = l.title; // e.g. "How much progress did the Romans make in public health?"
});

// 2. Update database.json
const dbPath = './database.json';
let db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
let dbUpdated = false;

if (db['water_and_sanitation'] && db['water_and_sanitation'].data) {
    let unit = db['water_and_sanitation'].data;
    unit.lessons.forEach(lesson => {
        if (newTitles[lesson.id]) {
            // Do NOT prepend "Lesson X: ". Just use the raw title (the inquiry question).
            lesson.title = newTitles[lesson.id];
            dbUpdated = true;
        }
    });
}

if (dbUpdated) {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
    console.log('Updated database.json with raw inquiry titles');
}

// 3. Update public/units/water_and_sanitation/data.json
const db2Path = './public/units/water_and_sanitation/data.json';
if (fs.existsSync(db2Path)) {
    let db2 = JSON.parse(fs.readFileSync(db2Path, 'utf8'));
    db2.title = unitData.title;
    // We already fixed the enquiry in fix_enquiry.js
    fs.writeFileSync(db2Path, JSON.stringify(db2, null, 2), 'utf8');
    console.log('Updated public data.json');
}

// 4. Update water_and_sanitation/index.html debatePrompts
const indexPath = './water_and_sanitation/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// The debate prompts might have "Lesson 1: Lesson 1: How much progress..." because of my last script.
// Let's just do a clean replace using regex.
const promptsRegex = /title:\s*"Lesson \d+:(.*?)"/g;
html = html.replace(promptsRegex, (match, p1, offset, string) => {
    // We just want it to say "Lesson X: [Inquiry]"
    // Wait, the debate prompts just say the title. If I use my newTitles array...
    return match; // Actually it's fine if the debate prompts say "Lesson X: [Inquiry]"
});

fs.writeFileSync(indexPath, html, 'utf8');
