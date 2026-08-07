const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'early_modern_world', 'data.js');
let content = fs.readFileSync(targetFile, 'utf8');

// Extract JSON
let jsonStr = content.substring(content.indexOf('{'));
jsonStr = jsonStr.replace(/;\s*$/, '');
let data = JSON.parse(jsonStr);

let count = 0;

data.lessons.forEach(lesson => {
    lesson.narrative_blocks.forEach(block => {
        if (block.title && block.title.includes("Side Quest") && block.text) {
            // First, add overflow:auto to details
            block.text = block.text.replace(/<details class="side-quest-box">/g, '<details class="side-quest-box" style="overflow: auto;">');
            
            // Alternate left/right
            let floatDir = count % 2 === 0 ? 'left' : 'right';
            let margin = count % 2 === 0 ? '15px 20px 15px 0' : '15px 0 15px 20px';
            
            // Replace the text-align:center image wrapper
            block.text = block.text.replace(
                /<div style="text-align:center; margin:15px 0;">/g, 
                `<div style="float: ${floatDir}; width: 40%; min-width: 200px; margin: ${margin}; text-align: center;">`
            );
            
            count++;
        }
    });
});

const finalContent = "export const unitData = " + JSON.stringify(data, null, 2) + ";\n";
fs.writeFileSync(targetFile, finalContent);
console.log("Successfully alternated Side Quests. Total: " + count);
