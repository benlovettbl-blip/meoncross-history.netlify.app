const fs = require('fs');

const standardAssigner = `
function assignChronologicalNumbers(lesson, syncQNum) {
    if (lesson.primary_source && lesson.primary_source.question) { lesson.primary_source.qNum = syncQNum++; }
    if (lesson.do_now && (lesson.do_now.prediction_question || lesson.do_now.question)) { lesson.do_now.qNum = syncQNum++; }
    
    if (lesson.vocab_cloze_text) {
        // Wait, vocab cloze doesn't have a QNum?
    }

    if (lesson.narrative_blocks) {
        lesson.narrative_blocks.forEach(block => {
            if (block.tasks) {
                block.tasks.forEach(task => { if (task.type !== 'vocab_match' && task.type !== 'drag_drop_timeline') { task.qNum = syncQNum++; } });
            }
            if (block.hinge_question) { block.hinge_question.qNum = syncQNum++; }
            if (block.source && block.source.question) { block.source.qNum = syncQNum++; }
        });
    }

    if (lesson.pair_share) { lesson.pair_share.qNum = syncQNum++; }
    if (lesson.tasks) { lesson.tasks.forEach(task => { task.qNum = syncQNum++; }); }
    
    if (lesson.extended && lesson.extended.question) { lesson.extended.qNum = syncQNum++; }
    
    if (lesson.sources) {
        lesson.sources.forEach(source => { if (source.question) source.qNum = syncQNum++; });
    }

    if (lesson.historians_corner && lesson.historians_corner.stretch_question) { lesson.historians_corner.qNum = syncQNum++; }
    
    if (lesson.gcse_task) {
        if (lesson.gcse_task.tasks) {
            lesson.gcse_task.tasks.forEach(t => { t.qNum = syncQNum++; });
        }
        lesson.gcse_task.qNum = syncQNum++;
    }
    
    return syncQNum;
}
`;

function patchFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (!content.includes('assignChronologicalNumbers')) {
        content = content.replace("const getTariffBadge = ", standardAssigner + "\nconst getTariffBadge = ");
    }
    
    // Replace the inner loop logic
    const loopStartPattern = /periodLessons\.forEach\(\(lesson,\s*lessonIndex\)\s*=>\s*\{/;
    if (!loopStartPattern.test(content)) {
        console.log(`Could not find periodLessons.forEach in ${filePath}`);
        return;
    }
    
    // Inject syncQNum outside
    content = content.replace(loopStartPattern, "let syncQNum = 1;\n  periodLessons.forEach((lesson, lessonIndex) => {");

    // Remove the old globalQNum lines
    content = content.replace(/\s*let globalQNum = 1;/g, '');
    
    // Replace the block of qNum assignments inside the loop with assignChronologicalNumbers
    // We will look for: let currentUnitId = ...
    // and replace everything up to the first loop that generates HTML.
    
    // For textbooks:
    content = content.replace(/let currentUnitId[\s\S]*?(?=if \(lesson\.hook_text\)|if \(lesson\.primary_source\))/g, 
    `let currentUnitId = typeof unitId !== 'undefined' ? unitId : 'great_war';
    syncQNum = assignChronologicalNumbers(lesson, syncQNum);
    `);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Patched ${filePath}`);
}

patchFile('generate_textbooks.js');
patchFile('generate_pupil_workbooks.js');
