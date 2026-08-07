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
            // Remove overflow: auto
            block.text = block.text.replace(/<details class="side-quest-box" style="overflow: auto;">/g, '<details class="side-quest-box">');
            
            // Revert left float
            block.text = block.text.replace(
                /<div style="float: left; width: 40%; min-width: 200px; margin: 15px 20px 15px 0; text-align: center;">/g, 
                '<div style="text-align:center; margin:15px 0;">'
            );
            
            // Revert right float
            block.text = block.text.replace(
                /<div style="float: right; width: 40%; min-width: 200px; margin: 15px 0 15px 20px; text-align: center;">/g, 
                '<div style="text-align:center; margin:15px 0;">'
            );
            
            count++;
        }
    });
});

const finalContent = "export const unitData = " + JSON.stringify(data, null, 2) + ";\n";
fs.writeFileSync(targetFile, finalContent);
console.log("Successfully reverted Side Quests to vertical layout. Total: " + count);
