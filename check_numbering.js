const fs = require('fs');
const path = require('path');

const regex = /^(Recall from (last|previous) lesson(s)?:\s*|PAST TOPIC:\s*|Enquiry:\s*|Predict:\s*|Q\d+[:.]?\s*|Task \d+[:.]?\s*|Question \d+[a-z]?[:.]?\s*|Enquiry Task[:.]?\s*|\d+\.\s*)/i;

function clean(text) {
    if (!text) return "";
    return text.replace(regex, "");
}

const suspiciouslyNumbered = [];

function checkText(text, location) {
    if (!text || typeof text !== 'string') return;
    const cleaned = clean(text);
    const suspiciousRegex = /^(\d+[\.\)]|Q\.?\d+|Task[s]?\s+\d+|Activity\s+\d+|Question\s+\d+|Source\s+[A-Z]\s+Task|Task:)/i;
    if (suspiciousRegex.test(cleaned)) {
        suspiciouslyNumbered.push({ location, original: text, cleaned });
    }
}

function processFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    // Extract everything that looks like "question": "..." or "text": "..."
    const matches = content.matchAll(/"(question|text)"\s*:\s*"([^"]+)"/g);
    for (const match of matches) {
        checkText(match[2], filePath);
    }
}

const unitsDir = path.join(__dirname, 'public', 'units');
const units = fs.readdirSync(unitsDir);
units.forEach(unit => {
    const dataPath = path.join(unitsDir, unit, 'data.js');
    if (fs.existsSync(dataPath)) {
        processFile(dataPath);
    }
});

console.log(`Found ${suspiciouslyNumbered.length} suspicious numbering leftovers after cleaning.`);
suspiciouslyNumbered.forEach(item => {
    console.log(`\nLocation: ${item.location}`);
    console.log(`Original: ${item.original}`);
    console.log(`Cleaned:  ${item.cleaned}`);
});
