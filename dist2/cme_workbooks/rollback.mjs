import fs from 'fs';

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

const oldHeader = '<i class="fa-solid fa-fire-flame-curved"></i> Educator Resource Hub: Major War Revision Quizzes';
const newHeader = '<i class="fa-solid fa-fire-flame-curved"></i> Educator Resource Hub: Major War Graphic Organizers';

const oldDesc = 'Generate and print 15-question Quick-Fire Quiz worksheets focused specifically on any of the five major wars in the Edexcel GCSE specification. Includes a student sheet (Page 1) and a teacher answer key with diagnostic grading boundaries (Page 2).';
const newDesc = 'Generate and print 2-page Graphic Organizer worksheets focused specifically on any of the five major wars in the Edexcel GCSE specification. Includes a structured narrative writing template (Page 1) and a chronological timeline analysis (Page 2).';

html = html.replace(oldHeader, newHeader);
html = html.replace(oldDesc, newDesc);

fs.writeFileSync('index.html', html);

// 2. Remove warMap logic from src/lessons.js
let lessons = fs.readFileSync('src/lessons.js', 'utf8');

const warMapRegex = /[ \t]*const warMap = \{[\s\S]*?if \(warId\) \{[\s\S]*?if \(bodyStartIdx !== -1 && bodyEndIdx !== -1\) \{[\s\S]*?html \+= '\\n' \+ warBodyContent;[\s\S]*?\}[\s\S]*?\}[\s\S]*?\}/;
lessons = lessons.replace(warMapRegex, '');

fs.writeFileSync('src/lessons.js', lessons);

console.log("Rollback completed.");
