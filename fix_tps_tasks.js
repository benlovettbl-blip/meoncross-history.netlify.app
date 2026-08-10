const fs = require('fs');

const filePath = 'early_modern_world/data.js';
let content = fs.readFileSync(filePath, 'utf8');
const match = content.match(/export const unitData = ([\s\S]+);/);

if (!match) {
    console.log("Failed to match unitData");
    process.exit(1);
}

let data = eval('(' + match[1] + ')');
let count = 0;

function convertToTPS(lessonIdx, searchString) {
    let found = false;
    data.lessons[lessonIdx].narrative_blocks.forEach(b => {
        if (b.tasks) {
            let t = b.tasks.find(tk => (tk.text || tk.question || '').includes(searchString));
            if (t) {
                t.type = "think_pair_share";
                found = true;
                count++;
            }
        }
    });
    if (!found) {
        console.log(`Could not find task with string "${searchString}" in lesson ${lessonIdx+1}`);
    }
}

convertToTPS(0, "Professor Frankopan's argument");
convertToTPS(1, "reality of scurvy");
convertToTPS(2, "Perspective A and Perspective B disagree");
convertToTPS(3, "Source C reveal");
convertToTPS(7, "Source C and Source D offer completely opposite");

const newContent = content.substring(0, match.index) + 'export const unitData = ' + JSON.stringify(data, null, 2) + ';' + content.substring(match.index + match[0].length);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log(`Successfully patched early_modern_world/data.js. Converted ${count} tasks to think_pair_share.`);
