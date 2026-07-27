const fs = require('fs');
const data = JSON.parse(fs.readFileSync('c:/Projects/meoncross-history.netlify.app/public/database.json', 'utf8'));

const med = data.edexcel_medicine.data;
const cme = data.cme_new.data;

console.log("=== UNIT LEVEL FEATURES (edexcel_medicine vs cme_new) ===");
const allRootKeys = new Set([...Object.keys(med), ...Object.keys(cme)]);
allRootKeys.forEach(k => {
    const medHas = med[k] !== undefined ? 'Yes' : 'No';
    const cmeHas = cme[k] !== undefined ? 'Yes' : 'No';
    console.log(`${k.padEnd(20)} | MED: ${medHas.padEnd(3)} | CME: ${cmeHas.padEnd(3)}`);
});

console.log("\n=== LESSON LEVEL FEATURES ===");

function analyzeLessons(unitName, lessons) {
    if (!lessons || !Array.isArray(lessons)) {
        console.log(`${unitName} has no lessons array`);
        return;
    }
    
    const keyCounts = {};
    const doNowTypes = new Set();
    let total = lessons.length;
    
    lessons.forEach(l => {
        Object.keys(l).forEach(k => {
            keyCounts[k] = (keyCounts[k] || 0) + 1;
        });
        if (l.do_now && l.do_now.type) doNowTypes.add(l.do_now.type);
    });
    
    console.log(`\n${unitName} (${total} lessons):`);
    Object.entries(keyCounts).sort((a,b) => b[1] - a[1]).forEach(([k, count]) => {
        console.log(`  - ${k}: ${count}/${total}`);
    });
    if (doNowTypes.size > 0) {
        console.log(`  - do_now types: ${Array.from(doNowTypes).join(', ')}`);
    }
}

analyzeLessons("Medicine", med.lessons);
analyzeLessons("Middle East", cme.lessons);

console.log("\n=== NARRATIVE BLOCKS (LESSON 1) ===");
function analyzeNarrative(unitName, lessons) {
    if (!lessons || lessons.length === 0) return;
    const l = lessons[0];
    if (!l.narrative_blocks) {
        console.log(`${unitName} has no narrative_blocks in lesson 1`);
        return;
    }
    console.log(`\n${unitName} Lesson 1 Narrative Blocks (${l.narrative_blocks.length}):`);
    l.narrative_blocks.forEach((nb, i) => {
        console.log(`  Block ${i+1} keys: ${Object.keys(nb).join(', ')}`);
    });
}
analyzeNarrative("Medicine", med.lessons);
analyzeNarrative("Middle East", cme.lessons);

