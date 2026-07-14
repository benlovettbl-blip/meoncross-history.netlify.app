const fs = require('fs');
const path = require('path');

const unitsDir = './';

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('.') && !dirent.name.includes('node_modules'))
    .map(dirent => dirent.name);

const units = getDirectories(unitsDir).filter(dir => fs.existsSync(path.join(unitsDir, dir, 'data.js')));

let violations = [];

units.forEach(unit => {
    try {
        const dataPath = path.join(unitsDir, unit, 'data.js');
        const content = fs.readFileSync(dataPath, 'utf8');
        const jsonStart = content.indexOf('{');
        const unitData = eval('(' + content.substring(jsonStart, content.lastIndexOf('}') + 1) + ')');
        
        unitData.lessons.forEach(lesson => {
            if (lesson.primary_source) {
                // Check if it has teacher_notes and source_context
                if (!lesson.teacher_notes || !lesson.teacher_notes.source_context) {
                    violations.push({ unit, lesson: lesson.title, reason: 'Missing teacher_notes.source_context entirely' });
                } else {
                    const context = lesson.teacher_notes.source_context.toLowerCase();
                    if (!context.includes('hinge question')) {
                        violations.push({ unit, lesson: lesson.title, reason: 'source_context does NOT contain a "Hinge Question"' });
                    }
                }
            }
        });
    } catch(e) {
        console.error(`Error parsing ${unit} data.js`);
    }
});

console.log("=== Pedagogical Hinge Question Audit ===");
if (violations.length === 0) {
    console.log("✅ All visual sources in the curriculum contain the required Hinge Question in their teacher notes!");
} else {
    console.log(`❌ Found ${violations.length} pedagogical rule violations:\n`);
    violations.forEach(v => {
        console.log(`[${v.unit.toUpperCase()}] ${v.lesson}`);
        console.log(`   -> Issue: ${v.reason}\n`);
    });
}
