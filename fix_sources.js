const fs = require('fs');

let dataStr = fs.readFileSync('early_modern_world/data.js', 'utf8');
const codeToEval = dataStr.replace('export const unitData =', 'global.unitData =');
eval(codeToEval);

global.unitData.lessons.forEach(lesson => {
    let letterCode = 65; // Start at 'A'
    function getNextLetter() { return String.fromCharCode(letterCode++); }
    
    function processBlock(block) {
        if (!block) return;
        
        // Fix source_letter property
        if (block.source_letter) {
            block.source_letter = getNextLetter();
        }
        
        // Fix hardcoded "Source X:" in text strings
        const regex = /Source [A-Z]:/g;
        
        if (block.title && typeof block.title === 'string' && block.title.match(regex)) {
            block.title = block.title.replace(regex, () => `Source ${getNextLetter()}:`);
        }
        if (block.text && typeof block.text === 'string' && block.text.match(regex)) {
            block.text = block.text.replace(regex, () => `Source ${getNextLetter()}:`);
        }
        if (block.image_caption && typeof block.image_caption === 'string' && block.image_caption.match(regex)) {
            block.image_caption = block.image_caption.replace(regex, () => `Source ${getNextLetter()}:`);
        }
    }
    
    // Process components in render order
    if (lesson.primary_source) processBlock(lesson.primary_source);
    if (lesson.visual_sources) lesson.visual_sources.forEach(processBlock);
    if (lesson.narrative_blocks) lesson.narrative_blocks.forEach(processBlock);
    if (lesson.interpretations) lesson.interpretations.forEach(processBlock);
});

// Also fix the broken image
let newDataStr = `export const unitData = ${JSON.stringify(global.unitData, null, 2)};\n`;
newDataStr = newDataStr.replace('/images/sources/east_india_docks.jpg', '/images/global_thames.jpg');

fs.writeFileSync('early_modern_world/data.js', newDataStr, 'utf8');
console.log('Fixed source letters and broken image in early_modern_world/data.js');
