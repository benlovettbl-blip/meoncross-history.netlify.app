const fs = require('fs');
const path = require('path');

// 1. Get the new titles from water_and_sanitation/data.js
const { unitData } = require('./water_and_sanitation/data.js');
const newTitles = {};
unitData.lessons.forEach((l, index) => {
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
            lesson.title = "Lesson " + lesson.id.split('_')[1] + ": " + newTitles[lesson.id];
            dbUpdated = true;
        }
    });
    
    // Also fix the overarching enquiry
    if (unit.enquiry && unit.enquiry.includes('What can we learn')) {
            unit.enquiry = 'Why did it take so long to clean up Britain?';
            dbUpdated = true;
    }
}

if (dbUpdated) {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
    console.log('Updated database.json');
}

// 3. Update water_and_sanitation/index.html debatePrompts
const indexPath = './water_and_sanitation/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

const oldTitles = [
    "Lesson 1: Prehistoric and Roman Sanitation",
    "Lesson 2: Medieval Sanitation and The Church",
    "Lesson 3: Early Modern Filth and Cesspits",
    "Lesson 4: The Industrial Revolution and Public Health", 
    "Lesson 5: The Great Stink and Modern Sewers"
];

const newTitleArray = [
    newTitles['lesson_1'],
    newTitles['lesson_2'],
    newTitles['lesson_3'],
    newTitles['lesson_4'],
    newTitles['lesson_5']
];

let htmlUpdated = false;
for (let i = 0; i < oldTitles.length; i++) {
    if (html.includes(oldTitles[i])) {
        // Just directly replace the string with "Lesson X: [Inquiry Question]" as requested
        html = html.replace(oldTitles[i], "Lesson " + (i+1) + ": " + newTitleArray[i]);
        htmlUpdated = true;
    }
}

if (htmlUpdated) {
    fs.writeFileSync(indexPath, html, 'utf8');
    console.log('Updated water_and_sanitation/index.html');
}
