const fs = require('fs');
const data = fs.readFileSync('early_modern_world/data.js', 'utf8');
const codeToEval = data.replace('export const unitData =', 'global.unitData =');
eval(codeToEval);

global.unitData.lessons.forEach((lesson, i) => {
    if (lesson.vocab && lesson.vocab.length > 0) {
        console.log(`Lesson ${i+1}: ${lesson.title}`);
        console.log("Vocab:", lesson.vocab.map(v => v.term).join(', '));
        console.log("Cloze text:", lesson.vocab_cloze_text ? "EXISTS" : "MISSING");
        console.log("---");
    }
});
