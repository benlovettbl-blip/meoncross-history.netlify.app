import fs from 'fs';

const dataPath = '../early_modern_world/data.js';
let content = fs.readFileSync(dataPath, 'utf8');
let jsonStr = content.replace('export const unitData =', '').trim().replace(/;$/, '');
let data = JSON.parse(jsonStr);

const fixes = [
    { l: 0, b: 4, old: 'Source C', new: 'Source A' },
    { l: 2, b: 4, old: 'Source F', new: 'Source B' },
    { l: 4, b: 3, old: 'Source E', new: 'Source B' },
    { l: 6, b: 3, old: 'Source B', new: 'Source A' },
    { l: 6, b: 5, old: 'Source D', new: 'Source B' },
    { l: 6, b: 7, old: 'Source F', new: 'Source C' },
    { l: 6, b: 9, old: 'Source E', new: 'Source D' },
    { l: 7, b: 7, old: 'Source E', new: 'Source C' }
];

fixes.forEach(fix => {
    let block = data.lessons[fix.l].narrative_blocks[fix.b];
    if (block && block.tasks) {
        block.tasks.forEach(t => {
            if (t.text && t.text.includes(fix.old)) {
                t.text = t.text.replaceAll(fix.old, fix.new);
            }
            if (t.question && t.question.includes(fix.old)) {
                t.question = t.question.replaceAll(fix.old, fix.new);
            }
        });
    }
});

fs.writeFileSync(dataPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
console.log('Successfully patched early_modern_world tasks!');
