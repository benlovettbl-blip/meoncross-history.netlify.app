const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'early_modern_world', 'data.js');
let txt = fs.readFileSync(filePath, 'utf8');

const startIdx = txt.indexOf('{');
const endIdx = txt.lastIndexOf('}') + 1;
const jsonStr = txt.substring(startIdx, endIdx);
let data = eval('(' + jsonStr + ')');

data.lessons.forEach(lesson => {
    if (!lesson.narrative_blocks) return;

    // 1. Fix Synoptic Challenge / Final Assessment Empty Box Bug
    lesson.narrative_blocks.forEach(block => {
        if (block.extended && block.text) {
            // Merge text into extended.question and delete text field
            block.extended.question = `${block.text}\n\n**Task:** ${block.extended.question}`;
            delete block.text;
            
            // Just in case it has an empty tasks array, delete it to be safe
            if (block.tasks && block.tasks.length === 0) {
                delete block.tasks;
            }
        }
    });

    // 2. Intelligently Relocate Hinge Questions
    const plenaryIdx = lesson.narrative_blocks.findIndex(b => b.title === 'Plenary Check' && b.hinge_question);
    if (plenaryIdx !== -1) {
        const plenaryBlock = lesson.narrative_blocks[plenaryIdx];
        const hq = plenaryBlock.hinge_question;
        const qText = hq.question.toLowerCase();

        // Find the best block to put it in
        let bestBlock = null;
        let highestScore = 0;

        lesson.narrative_blocks.forEach((block, idx) => {
            if (idx === plenaryIdx) return;
            if (block.title.includes('Side Quest') || block.title.includes('Synoptic Challenge')) return;

            let score = 0;
            const blockText = (block.title + " " + (block.text || "")).toLowerCase();
            
            // Simple keyword matching based on the question
            const words = qText.replace(/[^\w\s]/gi, '').split(' ').filter(w => w.length > 4);
            words.forEach(w => {
                if (blockText.includes(w)) score++;
            });

            // Hardcode specific overrides just to be perfectly accurate for this unit
            if (qText.includes("ottoman") && block.title.includes("Ottoman")) score += 100;
            if (qText.includes("tordesillas") && block.title.includes("Tordesillas")) score += 100;
            if (qText.includes("encomienda") && block.title.includes("Encomienda")) score += 100;
            if (qText.includes("parliament win") && block.title.includes("New Model Army")) score += 100;
            if (qText.includes("glorious revolution") && block.title.includes("Glorious Revolution")) score += 100;
            if (qText.includes("mercantilism") && block.title.includes("Mercantilism")) score += 100;

            if (score > highestScore) {
                highestScore = score;
                bestBlock = block;
            }
        });

        if (bestBlock) {
            bestBlock.hinge_question = hq;
            
            // Only delete Plenary Check if it has no tasks or other content
            if (!plenaryBlock.text && (!plenaryBlock.tasks || plenaryBlock.tasks.length === 0)) {
                lesson.narrative_blocks.splice(plenaryIdx, 1);
            } else {
                delete plenaryBlock.hinge_question;
            }
        }
    }

    // 3. Relocate Side Quests to the very end
    const sideQuests = [];
    lesson.narrative_blocks = lesson.narrative_blocks.filter(block => {
        if (block.title && block.title.includes('Side Quest')) {
            sideQuests.push(block);
            return false;
        }
        return true;
    });

    // Re-append Side Quests to the end
    sideQuests.forEach(sq => {
        lesson.narrative_blocks.push(sq);
    });
});

const newContent = `export const unitData = ${JSON.stringify(data, null, 2)};`;
fs.writeFileSync(filePath, newContent, 'utf8');
console.log("Curriculum successfully restructured.");
