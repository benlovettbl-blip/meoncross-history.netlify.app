const fs = require('fs');

const filePath = 'early_modern_world/data.js';
let content = fs.readFileSync(filePath, 'utf8');
const match = content.match(/export const unitData = ([\s\S]+);/);

if (!match) {
    console.log("Failed to match unitData");
    process.exit(1);
}

let data = eval('(' + match[1] + ')');

let removedCount = 0;

data.lessons.forEach(l => {
    (l.narrative_blocks || []).forEach(b => {
        if (b.tasks) {
            const originalLength = b.tasks.length;
            b.tasks = b.tasks.filter(t => {
                const text = t.task || t.question || t.text || "";
                if (!t.type && text.startsWith("Lesson Reflection:")) {
                    return false; // remove
                }
                return true;
            });
            removedCount += (originalLength - b.tasks.length);
        }
    });
});

const newContent = content.substring(0, match.index) + 'export const unitData = ' + JSON.stringify(data, null, 2) + ';' + content.substring(match.index + match[0].length);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log(`Successfully removed ${removedCount} null lesson reflection tasks.`);
