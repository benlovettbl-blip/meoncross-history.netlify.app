const fs = require('fs');
const path = require('path');

const filePath = path.join('c:/Projects/meoncross-history.netlify.app/cme_new/data.js');
let content = fs.readFileSync(filePath, 'utf8');
const jsonContent = content.replace('export const unitData = ', '').trim().replace(/;$/, '');
let unitData = JSON.parse(jsonContent);

let modifiedCount = 0;

if (unitData.exam_blocks) {
    unitData.exam_blocks.forEach(block => {
        if (block.questions) {
            block.questions.forEach(q => {
                if (!q.text.includes('marks)')) {
                    if (q.text.startsWith('Explain one consequence')) {
                        q.text = q.text.trim() + ' (4 marks)';
                        modifiedCount++;
                    } else if (q.text.startsWith('Write a narrative account') || q.text.startsWith('Explain the importance')) {
                        q.text = q.text.trim() + ' (8 marks)';
                        modifiedCount++;
                    }
                }
            });
        }
    });
}

if (modifiedCount > 0) {
    const output = `export const unitData = ${JSON.stringify(unitData, null, 2)};`;
    fs.writeFileSync(filePath, output, 'utf8');
    console.log(`Successfully added marks to ${modifiedCount} exam block questions!`);
} else {
    console.log("No questions needed modifying.");
}
