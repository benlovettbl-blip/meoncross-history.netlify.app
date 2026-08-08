const fs = require('fs');
const path = require('path');

let data;
try {
    const raw = fs.readFileSync('public/units/early_modern_world/data.js', 'utf8');
    const match = raw.match(/export const unitData = ([\s\S]+);/);
    data = eval('(' + match[1] + ')');
} catch (e) {
    console.error("Error", e);
    process.exit(1);
}

// Lesson 5 is index 4
if (!data.lessons[4].banner) {
    data.lessons[4].banner = "/images/cape_coast_castle.jpg";
} else {
    data.lessons[4].banner = "/images/cape_coast_castle.jpg";
}

const newDataStr = `export const unitData = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync('public/units/early_modern_world/data.js', newDataStr, 'utf8');
fs.writeFileSync('early_modern_world/data.js', newDataStr, 'utf8');

console.log("Injected Cape Coast Castle banner!");
