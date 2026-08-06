const fs = require('fs');

const content = fs.readFileSync('early_modern_world/data.js', 'utf8');
const jsonStr = content.replace(/^export const unitData = /, '').trim().replace(/;$/, '');

let data;
try {
    data = eval('(' + jsonStr + ')');
} catch (e) {
    console.error("Eval failed", e);
    process.exit(1);
}

let removed = 0;
data.lessons.forEach(l => {
    if (l.narrative_blocks) {
        l.narrative_blocks.forEach(b => {
            if (b.tasks) {
                const before = b.tasks.length;
                b.tasks = b.tasks.filter(t => {
                    const hasMarksText = (t.text && typeof t.text === 'string' && t.text.includes('marks)'));
                    const hasMarksQuestion = (t.question && typeof t.question === 'string' && t.question.includes('marks)'));
                    const hasMarksProp = t.marks !== undefined;
                    return !(hasMarksText || hasMarksQuestion || hasMarksProp);
                });
                removed += (before - b.tasks.length);
            }
        });
    }
});

const output = `export const unitData = ${JSON.stringify(data, null, 4)};\n`;
fs.writeFileSync('early_modern_world/data.js', output, 'utf8');
console.log('Removed ' + removed + ' assessment practice tasks.');
