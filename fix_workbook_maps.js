const fs = require('fs');

function patchFile(filename, replacements) {
    if (!fs.existsSync(filename)) return;
    let code = fs.readFileSync(filename, 'utf8');
    let original = code;
    
    replacements.forEach(rep => {
        if (rep.target instanceof RegExp) {
            code = code.replace(rep.target, rep.replacement);
        } else if (code.includes(rep.target)) {
            code = code.replace(rep.target, rep.replacement);
        } else {
            console.log(`Warning: Target not found in ${filename}`);
        }
    });

    if (code !== original) {
        fs.writeFileSync(filename, code);
        console.log(`Patched ${filename}`);
    } else {
        console.log(`No changes made to ${filename}`);
    }
}

// Disable rendering images for primary_source in pupil workbooks entirely
const pupilWorkbookTarget = /let renderImages = true;\s+if \(!?lesson\.a4_map/i;
const pupilWorkbookReplacement = `let renderImages = false; // globally disabled for pupil workbooks to save space
      if (lesson.a4_map`;

patchFile('generate_pupil_workbooks.js', [
    { target: pupilWorkbookTarget, replacement: pupilWorkbookReplacement }
]);

// 4. Fix Textbook Question 1 Background & Q4 undefined
const textbookPrimarySourceQuestionTarget = "lesson.primary_source.question ? `<div style=\"margin-top: 15px; text-align: left;\"><strong>Q${lesson.primary_source.qNum}. ${lesson.primary_source.question.replace('Enquiry: ', '')}${lesson.primary_source.page ? ` (See Textbook Page ${lesson.primary_source.page})` : ''}</strong></div>` : ''";
const textbookPrimarySourceQuestionReplacement = `lesson.primary_source.question ? \`<div class="task-box" style="margin-top: 15px; text-align: left;"><strong>Q\${lesson.primary_source.qNum}. \${lesson.primary_source.question.replace('Enquiry: ', '')}\${lesson.primary_source.page ? \` (See Textbook Page \${lesson.primary_source.page})\` : ''}</strong></div>\` : ''`;

const textbookUndefinedTarget = "if (task.type === 'vocab_match' || task.type === 'categorization' || task.type === 'sequencing' || task.type === 'multi_source_analysis' || task.type === 'sentence_completion') continue;";
const textbookUndefinedReplacement = `if (task.type === 'vocab_match' || task.type === 'categorization' || task.type === 'sequencing' || task.type === 'multi_source_analysis' || task.type === 'sentence_completion' || task.type === 'drag_drop_timeline') continue;`;

patchFile('generate_textbooks.js', [
    { target: textbookPrimarySourceQuestionTarget, replacement: textbookPrimarySourceQuestionReplacement },
    { target: textbookUndefinedTarget, replacement: textbookUndefinedReplacement }
]);
