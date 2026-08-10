const fs = require('fs');

const textbook = fs.readFileSync('public/units/early_modern_world/textbook.html', 'utf8');
const workbook = fs.readFileSync('public/units/early_modern_world/pupil_workbook.html', 'utf8');

const regex = /(?:>|:\s)Q(\d+)[\.:]?\s([^<]+)</g;

let textbookMatches = [...textbook.matchAll(regex)];
let workbookMatches = [...workbook.matchAll(regex)];

console.log(`Found ${textbookMatches.length} questions in textbook`);
console.log(`Found ${workbookMatches.length} questions in workbook`);

const textbookQs = textbookMatches.map(m => `Q${m[1]}: ${m[2].trim()}`);
const workbookQs = workbookMatches.map(m => `Q${m[1]}: ${m[2].trim()}`);

let discrepancies = [];

for (let i = 0; i < Math.max(textbookQs.length, workbookQs.length); i++) {
    const tbQ = textbookQs[i];
    const wbQ = workbookQs[i];
    
    // We expect some differences in prefix (e.g. "Think-Pair-Share: Q3") but the core question should be similar
    if (!tbQ && wbQ) {
        discrepancies.push(`Missing in textbook at index ${i}: ${wbQ}`);
    } else if (tbQ && !wbQ) {
        discrepancies.push(`Missing in workbook at index ${i}: ${tbQ}`);
    }
}

if (discrepancies.length === 0) {
    console.log("No structural missing questions found!");
} else {
    console.log("Discrepancies found:");
    console.log(discrepancies.join('\n'));
}

// Write the lists to a file for manual inspection
fs.writeFileSync('comparison_log.txt', 'TEXTBOOK:\n' + textbookQs.join('\n') + '\n\nWORKBOOK:\n' + workbookQs.join('\n'));
console.log("Detailed lists written to comparison_log.txt");
