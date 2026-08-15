import fs from 'fs';
const content = fs.readFileSync('great_war_part2/data.js', 'utf8');
const jsonStr = content.replace('export const unitData =', '').trim().replace(/;$/, '');
const data = JSON.parse(jsonStr);

// Block 1
const block1 = data.lessons[4].narrative_blocks[1];
if (!block1.image_alt.startsWith('Source D:')) {
    block1.image_alt = 'Source D: ' + block1.image_alt;
}

// Block 2
const block2 = data.lessons[4].narrative_blocks[2];
block2.tasks.forEach(t => {
    if (t.text.includes('German political cartoon (Source E)')) {
        t.text = t.text.replace("How does the German political cartoon (Source E) reflect the German public's attitude toward the Treaty of Versailles? Refer specifically to the concept of the 'Diktat' and the Big Three.", "How does the photograph of the Allied leaders (Source E) reflect the power dynamic at the Treaty of Versailles? Refer specifically to the concept of the 'Diktat'.");
        t.model_answer = "The photograph shows the Big Four leaders who held complete power over Germany's fate. Because Germany was not invited to negotiate, they viewed the resulting treaty as a 'Diktat' (a dictated peace). The leaders pictured—especially Clemenceau—forced severe terms upon a defenseless Germany, reinforcing the feeling of victimization and intense national anger.";
    }
});

const outStr = 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n';
fs.writeFileSync('great_war_part2/data.js', outStr);
console.log('Fixed Lesson 5 blocks');
