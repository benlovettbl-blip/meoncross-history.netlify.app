const fs = require('fs');
const path = require('path');

const unitsDir = path.join(__dirname, 'public', 'units');
const units = fs.readdirSync(unitsDir).filter(f => fs.statSync(path.join(unitsDir, f)).isDirectory());

units.forEach(unitId => {
    const dataPath = path.join(unitsDir, unitId, 'data.js');
    if (!fs.existsSync(dataPath)) return;

    let f = fs.readFileSync(dataPath, 'utf8');
    let jsonStr = f.substring(f.indexOf('export const unitData = ') + 24);
    jsonStr = jsonStr.substring(0, jsonStr.lastIndexOf(';') > -1 ? jsonStr.lastIndexOf(';') : jsonStr.length);
    let unit;
    try {
        unit = eval('(' + jsonStr + ')');
    } catch(e) { return; }

    if (!unit.lessons) return;

    unit.lessons.forEach(lesson => {
        // Collect all source letters in the lesson
        let lessonSources = [];
        if (lesson.primary_source) {
            lessonSources.push(lesson.primary_source.title || ''); // maybe has "Source A" in title
        }
        if (lesson.narrative_blocks) {
            lesson.narrative_blocks.forEach(b => {
                if (b.source_letter) lessonSources.push(b.source_letter);
                if (b.images) {
                    b.images.forEach(i => {
                        if (i.source_letter) lessonSources.push(i.source_letter);
                    });
                }
            });
        }

        // Now check all tasks
        if (lesson.narrative_blocks) {
            lesson.narrative_blocks.forEach(b => {
                if (b.tasks) {
                    b.tasks.forEach(t => {
                        let text = t.text || '';
                        let matches = [...text.matchAll(/Source ([A-Z])/g)];
                        matches.forEach(m => {
                            let letter = m[1];
                            if (!lessonSources.includes(letter)) {
                                console.log(`Mismatch in ${unitId} -> "${lesson.title}": Task references Source ${letter}, but sources are: ${lessonSources.join(', ')}`);
                            }
                        });
                    });
                }
            });
        }
    });
});
