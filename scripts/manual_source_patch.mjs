import fs from 'fs';

const dataPath = '../great_war_part2/data.js';
let content = fs.readFileSync(dataPath, 'utf8');
let jsonStr = content.replace('export const unitData =', '').trim().replace(/;$/, '');
let data = JSON.parse(jsonStr);

// 1. L3 B3
let l3b3 = data.lessons[2].narrative_blocks[3];
delete l3b3.image;
delete l3b3.image_alt;
delete l3b3.image_caption;
// Remove the auto-generated task that asks about Source D
if (l3b3.tasks) {
    l3b3.tasks = l3b3.tasks.filter(t => !((t.question || '').includes('Study Source D. Based on the visual evidence')));
}

// 2. L4 B1
let l4b1 = data.lessons[3].narrative_blocks[1];
if (l4b1.tasks) {
    l4b1.tasks.forEach(t => {
        if (t.text && t.text.includes('Study Source A (the painting of the Munitionettes)')) {
            t.text = t.text.replace(/Source A/g, 'Source B');
        }
    });
    // Remove auto-generated task for Source B
    l4b1.tasks = l4b1.tasks.filter(t => !((t.question || '').includes('Study Source B. Based on the visual evidence')));
}

// 3. L4 B3
let l4b3 = data.lessons[3].narrative_blocks[3];
delete l4b3.image;
delete l4b3.image_alt;
delete l4b3.image_caption;
// Text already says "Source D: A censored letter", and tasks ask about Source D. Perfect.

// 4. L5 B2
let l5b2 = data.lessons[4].narrative_blocks[2];
delete l5b2.image;
delete l5b2.image_alt;
delete l5b2.image_caption;
if (l5b2.text) {
    l5b2.text = l5b2.text.replace(/Source E:/g, 'Source A:');
}
if (l5b2.tasks) {
    l5b2.tasks.forEach(t => {
        if (t.text && t.text.includes('Source E')) {
            t.text = t.text.replace(/Source E/g, 'Source A');
        }
    });
    // Remove auto-generated task for Source C
    l5b2.tasks = l5b2.tasks.filter(t => !((t.question || '').includes('Study Source C. Based on the visual evidence')));
}

fs.writeFileSync(dataPath, 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n');
console.log('Successfully patched great_war_part2!');
