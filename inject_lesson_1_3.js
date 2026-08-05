const fs = require('fs');

const unitPath = 'weimar_nazi_germany/data.js';
const dataStr = fs.readFileSync(unitPath, 'utf8');
const jsonStartIndex = dataStr.indexOf('{');
const preText = dataStr.substring(0, jsonStartIndex);

let jsonStr = dataStr.substring(jsonStartIndex);
jsonStr = jsonStr.replace(/;\s*if\s*\(\s*typeof\s+module\s*!==\s*'undefined'\s*\)\s*\{\s*module\.exports\s*=\s*\{\s*unitData\s*\}\s*;\s*\}/g, '');
jsonStr = jsonStr.replace(/;\s*$/, '');
jsonStr = jsonStr.trim();

const data = JSON.parse(jsonStr);

if (data.lessons) {
    const lesson = data.lessons.find(l => l.id === 'lesson_1_3');
    if (lesson) {
        if (!lesson.video) lesson.video = [];
        else if (!Array.isArray(lesson.video)) lesson.video = [lesson.video];
        
        lesson.video.push({
            "url": "https://era.org.uk/streaming-service-resource/6-making-germany-pay-history-file/",
            "title": "6 Making Germany Pay History File (Start at 15:00)"
        });
    }
}

const fallbackStr = `\n\nif (typeof module !== 'undefined') {\n  module.exports = { unitData };\n}\n`;
fs.writeFileSync(unitPath, preText + JSON.stringify(data, null, 2) + ';\n' + fallbackStr, 'utf8');
console.log(`Injected video into lesson_1_3.`);
