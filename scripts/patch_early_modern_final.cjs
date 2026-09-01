const fs = require('fs');
const path = './early_modern_world/data.js';

let content = fs.readFileSync(path, 'utf8');
let jsonStr = content.replace('export const unitData = ', '').replace(/;\s*$/, '');
let data = (new Function('return ' + jsonStr))();

data.lessons.forEach(lesson => {
    let baseBlocks = [];
    let assessmentPracticeBlock = null;
    let sideQuestBlock = null;
    let plenaryBlock = null;
    
    lesson.narrative_blocks.forEach(block => {
        // Remove all hinge questions
        if (block.hinge_question) {
            delete block.hinge_question;
        }

        // Identify block types
        if (block.title === 'Synoptic Challenge (Extension)') {
            block.title = 'Assessment Practice';
            assessmentPracticeBlock = block;
        } else if (block.title === 'Final Assessment (16 marks)' && lesson.id === 'lesson_7') {
            assessmentPracticeBlock = block; // Leave title as is for the final 16 marker, or rename? User said "for each lesson". We'll treat this as the assessment block.
        } else if (block.title && (block.title.toLowerCase().includes('side quest') || block.title.toLowerCase().includes('extension task'))) {
            sideQuestBlock = block;
        } else if (block.title === 'Plenary Check') {
            // Check if it's empty (no tasks, no text)
            if (!block.text && (!block.tasks || block.tasks.length === 0)) {
                // This is the empty paragraph 11 in lesson 2! We drop it.
            } else {
                plenaryBlock = block;
            }
        } else {
            baseBlocks.push(block);
        }
    });

    let newBlocks = [...baseBlocks];
    if (assessmentPracticeBlock) newBlocks.push(assessmentPracticeBlock);
    if (sideQuestBlock) newBlocks.push(sideQuestBlock);
    if (plenaryBlock) newBlocks.push(plenaryBlock);

    lesson.narrative_blocks = newBlocks;
});

const newContent = 'export const unitData = ' + JSON.stringify(data, null, 2) + ';\n';
fs.writeFileSync(path, newContent, 'utf8');
console.log('Successfully reordered blocks, removed hinge questions, and deleted empty plenary in Lesson 2.');
