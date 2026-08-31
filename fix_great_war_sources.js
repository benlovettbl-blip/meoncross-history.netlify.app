const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'great_war_part2', 'data.js');
const data = require(targetPath);

let modified = false;

function replaceSourceReferences(str, sourceMap) {
    if (typeof str !== 'string') return str;
    let newStr = str;
    newStr = newStr.replace(/Source\s+([A-Z])/g, (match, letter) => {
        if (sourceMap[letter]) {
            return `Source ${sourceMap[letter]}`;
        }
        return match;
    });
    return newStr;
}

data.lessons.forEach(lesson => {
    if (lesson.narrative_blocks && lesson.narrative_blocks.length > 0) {
        const firstBlock = lesson.narrative_blocks[0];
        if (firstBlock.tasks && firstBlock.tasks.length >= 3) {
            const isAllShortAnswer = firstBlock.tasks.every(t => t.type === 'short_answer');
            if (isAllShortAnswer) {
                firstBlock.tasks = [{
                    type: "short_answer",
                    text: "Knowledge Retrieval: Complete the summary table using the information from the text.",
                    model_answer: "Student completes table based on reading."
                }];
                modified = true;
            }
        }
    }
    
    if (lesson.consolidation && lesson.extended) {
        delete lesson.consolidation;
        modified = true;
    }

    let currentLetterCode = 65; // 'A'
    let sourceMap = {};

    function processObject(obj) {
        if (!obj || typeof obj !== 'object') return;
        
        let blockDefinitions = {}; 

        function findDefinitions(o) {
            if (!o || typeof o !== 'object') return;
            
            ['text', 'image_caption', 'image_alt', 'caption', 'title'].forEach(key => {
                if (typeof o[key] === 'string') {
                    const matches = [...o[key].matchAll(/Source\s+([A-Z])\s*[:\-]/g)];
                    matches.forEach(match => {
                        const originalLetter = match[1];
                        if (!blockDefinitions[originalLetter]) {
                            const newLetter = String.fromCharCode(currentLetterCode++);
                            sourceMap[originalLetter] = newLetter;
                            blockDefinitions[originalLetter] = newLetter;
                            modified = true;
                        }
                    });
                }
            });

            for (let k in o) {
                if (typeof o[k] === 'object') findDefinitions(o[k]);
            }
        }
        
        findDefinitions(obj);

        if (obj.image_caption && obj.image_caption.includes('Women of Britain')) {
            console.log('Block 3 sourceMap before update:', sourceMap);
            console.log('Block 3 original image_caption:', obj.image_caption);
        }

        function updateReferences(o) {
            if (!o || typeof o !== 'object') return;
            for (let key in o) {
                if (typeof o[key] === 'string') {
                    const oldStr = o[key];
                    const newStr = replaceSourceReferences(oldStr, sourceMap);
                    if (oldStr !== newStr) {
                        o[key] = newStr;
                        modified = true;
                    }
                } else if (typeof o[key] === 'object') {
                    updateReferences(o[key]);
                }
            }
        }
        
        updateReferences(obj);
    }

    if (lesson.narrative_blocks) lesson.narrative_blocks.forEach(block => processObject(block));
    if (lesson.pair_share) processObject(lesson.pair_share);
    if (lesson.tasks) lesson.tasks.forEach(task => processObject(task));
    if (lesson.extended) processObject(lesson.extended);
    if (lesson.lesson_assessment) processObject(lesson.lesson_assessment);
    if (lesson.consolidation) processObject(lesson.consolidation);
});

if (modified) {
    const fileContent = `module.exports = ${JSON.stringify(data, null, 2)};\n`;
    fs.writeFileSync(targetPath, fileContent, 'utf8');
    console.log('Successfully updated source data.js');
} else {
    console.log('No modifications needed.');
}
